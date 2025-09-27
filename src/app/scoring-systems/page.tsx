export default function ScoringSystems() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        中国滑雪赛事四大积分系统
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">高山滑雪积分系统</h2>
          <p className="text-gray-600 mb-3">基于时间的v4.0积分计算体系</p>
          <div className="text-sm space-y-1">
            <p>• 计算公式: 最终积分 = (基础积分 + 判罚分) × 赛事系数</p>
            <p>• 项目: DH/SL/GS/SG/AC</p>
            <p>• 系数: A级(1.0) B级(0.6) C级(0.3)</p>
          </div>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">自由式滑雪积分系统</h2>
          <p className="text-gray-600 mb-3">240/360/120分档排名积分体系</p>
          <div className="text-sm space-y-1">
            <p>• 一类赛事: 360分档</p>
            <p>• 二类赛事: 240分档</p>
            <p>• 三类赛事: 120分档</p>
            <p>• 项目: BA/SS/HP等</p>
          </div>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">单板滑雪积分系统</h2>
          <p className="text-gray-600 mb-3">技巧项目排名积分体系</p>
          <div className="text-sm space-y-1">
            <p>• 基于排名的积分分配</p>
            <p>• 第一名100%, 第二名80%, 第三名60%</p>
            <p>• 项目: BA/SS/HP/PSL/PGS</p>
          </div>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">U系列青少年积分</h2>
          <p className="text-gray-600 mb-3">U12/U15/U18独立积分管理</p>
          <div className="text-sm space-y-1">
            <p>• U12组: 发展积分</p>
            <p>• U15/U18组: 正式积分</p>
            <p>• 独立排名, 32人/组上限</p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-3">积分延续机制</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="font-bold text-blue-600">×50%</div>
            <p>赛季结束后积分延续</p>
          </div>
          <div className="text-center">
            <div className="font-bold text-green-600">7.1-6.30</div>
            <p>赛季周期</p>
          </div>
          <div className="text-center">
            <div className="font-bold text-purple-600">Best 2</div>
            <p>最好两次成绩</p>
          </div>
        </div>
      </div>
    </div>
  )
}