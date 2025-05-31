import { fz } from '@/styles/mixin'
import type { TooltipModel } from 'chart.js'

export const createCustomTooltip = () => {
  let tooltipEl = document.getElementById('chartjs-tooltip')

  if (!tooltipEl) {
    tooltipEl = document.createElement('div')
    tooltipEl.id = 'chartjs-tooltip'
    tooltipEl.innerHTML = '<table></table>'
    document.body.appendChild(tooltipEl)
  }
  return tooltipEl
}

export const positionTooltip = (tooltipModel: TooltipModel<'bar'>) => {
  const tooltipEl = createCustomTooltip()

  if (tooltipModel.opacity === 0) {
    tooltipEl.style.opacity = '0'
    return
  }

  const position = tooltipModel.chart.canvas.getBoundingClientRect()

  // ツールチップのスタイル設定
  Object.assign(tooltipEl.style, {
    position: 'absolute',
    fontFamily: 'inherit',
    fontSize: fz(16),
    fontStyle: 'inherit',
    color: 'white',
    background: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '10px',
    padding: '0.5em',
    transition: 'opacity 0.3s',
    opacity: '1',
    transform: 'translate(-50%, 0)',
    overflow: 'hidden',
    pointerEvents: 'none',
  })

  const tooltipWidth = tooltipEl.offsetWidth
  const tooltipHeight = tooltipEl.offsetHeight

  let left = position.left + window.scrollX + tooltipModel.caretX
  let top = position.top + window.scrollY + tooltipModel.caretY

  // ツールチップがキャンバスの左端を越えないようにする
  if (left < position.left + window.scrollX) {
    left = position.left + window.scrollX
  }

  // ツールチップがキャンバスの右端を越えないようにする
  if (left + tooltipWidth > position.right + window.scrollX) {
    left = position.right + window.scrollX - tooltipWidth
  }

  // ツールチップがキャンバスの上端を越えないようにする
  if (top < position.top + window.scrollY) {
    top = position.top + window.scrollY
  }

  // ツールチップがキャンバスの下端を越えないようにする
  if (top + tooltipHeight > position.bottom + window.scrollY) {
    top = position.bottom + window.scrollY - tooltipHeight
  }

  // 位置を再調整
  tooltipEl.style.left = `${left}px`
  tooltipEl.style.top = `${top}px`
}
