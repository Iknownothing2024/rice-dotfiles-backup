import React, { memo } from "react";
import { Calendar, MapPin } from "lucide-react";
import Sidebar from "./Sidebar";

const About = memo(() => (
  <div className="min-h-screen pt-16">
    <Sidebar />

    {/* Main Content */}
    <main className="ml-96 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          {/* Introduction */}
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-6 border border-gray-700/30">
            <h4 className="text-xl font-bold mb-4 text-white">关于我</h4>
            <div className="space-y-4 text-sm text-gray-200/80">
              <p>2026年1月23日 金曜日</p>
            </div>
            <div className="space-y-4 text-gray-200/90">
              <p>
                网络漫游者，蛰居在阴暗小房间的宅男，妄想时空穿越，想要转生異世界，永遠に十八歳未満です
              </p>
              <p>ER每天重复死宅家里蹲幻想梦幻阴暗欢乐生活就像佐藤西条拓己人见ER</p>
              <p>只想重开到2019-2020年</p>
              <div className="text-xl font-bold text-white">And I hate DQN</div>
              
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-6 border border-gray-700/30">
              <div className="flex items-center gap-3 mb-3">
                <Calendar size={20} className="text-primary-400" />
                <h4 className="text-lg font-semibold text-white">时间线</h4>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-gray-200/90">博客创建日期</span>

                <div className="text-right text-gray-300/70 leading-tight">
                  <div className="text-sm text-gray-300/60 text-left">
                    二零二六年
                  </div>
                  <div className="text-sm text-gray-300/60 text-left">一月</div>
                  <div className="text-sm text-gray-300/60 text-left">
                    十一日
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-6 border border-gray-700/30">
              <div className="flex items-center gap-3 mb-3">
                <MapPin size={20} className="text-primary-400" />
                <h4 className="text-lg font-semibold text-white">位置</h4>
              </div>
              <div className="space-y-2 text-sm text-gray-200/90">
                <div className="flex justify-between">
                  <span>所在国家</span>
                  <span className="text-gray-300/70">中国</span>
                </div>
                <div className="flex justify-between">
                  <span>所在区域</span>
                  <span className="text-gray-300/70">巴蜀</span>
                </div>
                <div className="flex justify-between">
                  <span>时区</span>
                  <span className="text-gray-300/70">UTC+8</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
));

About.displayName = "About";

export default About;
