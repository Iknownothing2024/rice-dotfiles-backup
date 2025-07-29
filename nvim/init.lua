-- bootstrap lazy.nvim, LazyVim and your plugins
require("config.lazy")
-- 共享 Neovim 和系统剪贴板
vim.opt.clipboard = "unnamedplus" -- Linux/macOS
-- Windows 用：
-- vim.opt.clipboard = "unnamed"
