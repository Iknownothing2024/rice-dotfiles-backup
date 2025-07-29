#!/usr/bin/env bash

# 定义星期名称映射
declare -A weekdays=(
  ["Monday"]=" 月 曜 日 "
  ["Tuesday"]=" 火 曜 日 "
  ["Wednesday"]=" 水 曜 日 "
  ["Thursday"]=" 木 曜 日 "
  ["Friday"]=" 金 曜 日 "
  ["Saturday"]=" 土 曜 日 "
  ["Sunday"]=" 日 曜 日"
)

# 获取当前日期和时间
current_date=$(date +"%Y-%m-%d")
current_time=$(date +"%H:%M:%S")
english_day=$(date +"%A")

# 转换为日语表达
japanese_day=${weekdays[$english_day]}

# 输出格式化结果
echo "   $current_date  $current_time $japanese_day "
