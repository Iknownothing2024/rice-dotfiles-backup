// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::env;
use std::path::Path;

fn main() {
    let session_type = env::var("XDG_SESSION_TYPE").unwrap_or_default();
    let is_wayland = session_type == "wayland" || env::var_os("WAYLAND_DISPLAY").is_some();
    let has_x11_display = env::var_os("DISPLAY").is_some();
    let is_nvidia = Path::new("/proc/driver/nvidia/version").exists();

    if is_wayland && is_nvidia {
        if env::var_os("WEBKIT_DISABLE_DMABUF_RENDERER").is_none() {
            env::set_var("WEBKIT_DISABLE_DMABUF_RENDERER", "1");
        }

        if has_x11_display && env::var_os("GDK_BACKEND").is_none() {
            env::set_var("GDK_BACKEND", "x11");
        }
    }

    the_collector_lib::run()
}
