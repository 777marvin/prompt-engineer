use std::sync::atomic::{AtomicBool, Ordering};

pub struct LlmRouter {
    pub model_ready: AtomicBool,
}

impl LlmRouter {
    pub fn new() -> Self {
        Self {
            model_ready: AtomicBool::new(false),
        }
    }

    pub fn is_ready(&self) -> bool {
        self.model_ready.load(Ordering::SeqCst)
    }

    pub fn set_ready(&self, ready: bool) {
        self.model_ready.store(ready, Ordering::SeqCst);
    }
}
