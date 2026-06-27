#![cfg_attr(mobile, tauri::mobile_entry_point)]

use std::sync::Arc;
use tauri::{Emitter, Manager};
use crate::state::AppState;

pub mod commands;
pub mod error;
pub mod llm;
pub mod state;

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            // Resolve app data dir for model storage
            let app_data_dir = app
                .path()
                .app_data_dir()
                .expect("failed to resolve app data dir");
            std::fs::create_dir_all(app_data_dir.join("models")).ok();

            let state = Arc::new(AppState::new(app_data_dir));
            app.manage(state.clone());

            // Spawn model download check
            let app_handle = app.handle().clone();
            tauri::async_runtime::spawn(async move {
                if !llm::local::check_model_cache(&state).await {
                    llm::local::start_download(app_handle, state);
                } else {
                    state.set_status(crate::state::ModelStatus::Ready);
                    state.router.set_ready(true);
                    app_handle.emit("model_ready", ()).ok();
                }
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::refine::get_model_status,
            commands::refine::retry_model_download,
            commands::refine::fast_refine,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
