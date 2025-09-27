export default function SimplePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        中国滑雪赛事积分系统
      </h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">四大积分系统</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">高山滑雪积分系统</h3>
            <p className="text-gray-600">基于时间的v4.0积分计算体系</p>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">自由式滑雪积分系统</h3>
            <p className="text-gray-600">240/360/120分档排名积分体系</p>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">单板滑雪积分系统</h3>
            <p className="text-gray-600">技巧项目排名积分体系</p>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">U系列青少年积分</h3>
            <p className="text-gray-600">U12/U15/U18独立积分管理</p>
          </div>
        </div>
      </div>
    </div>
  )
}