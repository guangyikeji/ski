/**
 * 导出工具函数
 * 支持 Excel、CSV、PDF 等格式的数据导出
 */

export interface ExportData {
  filename: string;
  data: any[];
  columns?: string[];
  title?: string;
}

/**
 * 导出为 CSV 格式
 */
export function exportToCSV(exportData: ExportData): void {
  const { filename, data, columns } = exportData;

  if (!data || data.length === 0) {
    alert('没有数据可导出');
    return;
  }

  // 获取列名
  const headers = columns || Object.keys(data[0]);

  // 生成 CSV 内容
  const csvContent = [
    // 头部
    headers.join(','),
    // 数据行
    ...data.map(row =>
      headers.map(header => {
        const value = row[header] || '';
        // 处理包含逗号、换行符或双引号的值
        if (typeof value === 'string' && (value.includes(',') || value.includes('\n') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  // 添加 BOM 以支持中文
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });

  // 创建下载链接
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // 清理 URL 对象
  URL.revokeObjectURL(url);
}

/**
 * 导出为 Excel 格式 (简化版，生成 HTML 表格)
 */
export function exportToExcel(exportData: ExportData): void {
  const { filename, data, columns, title } = exportData;

  if (!data || data.length === 0) {
    alert('没有数据可导出');
    return;
  }

  const headers = columns || Object.keys(data[0]);

  // 生成 HTML 表格
  let htmlContent = `
    <html>
      <head>
        <meta charset="utf-8">
        <title>${title || filename}</title>
        <style>
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; font-weight: bold; }
          .title { font-size: 18px; font-weight: bold; margin-bottom: 10px; }
        </style>
      </head>
      <body>
        ${title ? `<div class="title">${title}</div>` : ''}
        <table>
          <thead>
            <tr>
              ${headers.map(header => `<th>${header}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${data.map(row =>
              `<tr>${headers.map(header => `<td>${row[header] || ''}</td>`).join('')}</tr>`
            ).join('')}
          </tbody>
        </table>
      </body>
    </html>
  `;

  const blob = new Blob([htmlContent], { type: 'application/vnd.ms-excel' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.xls`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

/**
 * 导出为 JSON 格式
 */
export function exportToJSON(exportData: ExportData): void {
  const { filename, data } = exportData;

  if (!data || data.length === 0) {
    alert('没有数据可导出');
    return;
  }

  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });

  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.json`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

/**
 * 通用导出函数，根据格式自动选择导出方式
 */
export function exportData(exportData: ExportData, format: 'csv' | 'excel' | 'json' = 'csv'): void {
  try {
    switch (format) {
      case 'csv':
        exportToCSV(exportData);
        break;
      case 'excel':
        exportToExcel(exportData);
        break;
      case 'json':
        exportToJSON(exportData);
        break;
      default:
        throw new Error(`不支持的导出格式: ${format}`);
    }
  } catch (error) {
    console.error('导出失败:', error);
    alert('导出失败，请重试');
  }
}

/**
 * 格式化积分排行榜数据用于导出
 */
export function formatRankingsForExport(rankings: any[]): ExportData {
  const data = rankings.map((item) => ({
    '排名': item.rank,
    '运动员': item.name,
    '国家/地区': item.nationality,
    '项目': item.discipline,
    '中国积分': item.points,
    '趋势': item.trend === 'up' ? '上升' : item.trend === 'down' ? '下降' : '稳定',
    '最近比赛': item.lastRace,
    '参赛次数': item.totalRaces,
    '最佳成绩': item.bestResult
  }));

  return {
    filename: `中国积分排行榜_${new Date().toISOString().split('T')[0]}`,
    data,
    title: '中国积分排行榜'
  };
}

/**
 * 格式化运动员历史数据用于导出
 */
export function formatAthleteHistoryForExport(history: any[], athleteName: string): ExportData {
  const data = history.map(item => ({
    '比赛日期': item.date,
    '比赛名称': item.competition,
    '项目': item.discipline,
    '排名': item.rank,
    '成绩时间': item.time,
    '比赛积分': item.racePoints,
    '惩罚值': item.penalty,
    '最终积分': item.finalPoints,
    '比赛地点': item.location
  }));

  return {
    filename: `${athleteName}_比赛历史_${new Date().toISOString().split('T')[0]}`,
    data,
    title: `${athleteName} - 比赛历史记录`
  };
}

/**
 * 格式化比赛结果数据用于导出
 */
export function formatCompetitionResultsForExport(results: any[], competitionName: string): ExportData {
  const data = results.map(item => ({
    '排名': item.rank,
    '运动员': item.athlete,
    '国家/地区': item.country,
    '成绩': item.time,
    '差距': item.gap,
    '中国积分': item.fisPoints
  }));

  return {
    filename: `${competitionName}_比赛结果_${new Date().toISOString().split('T')[0]}`,
    data,
    title: `${competitionName} - 比赛结果`
  };
}