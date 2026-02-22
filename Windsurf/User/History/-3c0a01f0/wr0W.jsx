import React, { memo } from 'react';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

const About = memo(() => (
  <section id="about" className="min-h-screen bg-gray-900 text-white">
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {/* Profile Card - Full Left Side */}
        <div className="md:col-span-1">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 h-full">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold mb-2">人見広介</h2>
              <p className="text-gray-400 text-sm mb-4">
                没有天赋，没有才能，什么都没有<br/>
                只想重开到2019~2020
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          {/* Introduction */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-bold mb-4 text-primary-400">关于我</h3>
            <div className="space-y-4 text-gray-300">
              <p>
                我每天都在重复着
              </p>
              <p>
                我只想重开到2019-2020年
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <Calendar size={20} className="text-primary-400" />
                <h4 className="text-lg font-semibold">时间线</h4>
              </div>
              <div className="flex justify-between items-start">
                <span>博客创建日期</span>

              <div className="text-right text-gray-500 leading-tight">
                <div className="text-sm text-gray-600 text-left" >二零二六年</div>
                <div className="text-sm text-gray-600 text-left">一月</div>
                <div className="text-sm text-gray-600 text-left">十一日</div>
              </div>
              </div>

            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <MapPin size={20} className="text-primary-400" />
                <h4 className="text-lg font-semibold">位置</h4>
              </div>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>所在国家</span>
                  <span className="text-gray-500">中国</span>
                </div>
                <div className="flex justify-between">
                  <span>所在区域</span>
                  <span className="text-gray-500">巴蜀</span>
                </div>
                <div className="flex justify-between">
                  <span>时区</span>
                  <span className="text-gray-500">UTC+8</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
));

About.displayName = 'About';

export default About;
