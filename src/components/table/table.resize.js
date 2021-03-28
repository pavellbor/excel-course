import {$} from "../../core/dom"

export function tableResizeHandler($root, event) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const type = $resizer.data.resize
  const sideProp = type === 'col' ? 'bottom' : 'right'
  let value
  let delta

  $resizer.css({
    opacity: 1,
    [sideProp]: '-5000px'
  })

  document.onmousemove = e => {
    if (type === 'col') {
      delta = e.pageX - coords.right
      value = coords.width + delta
      $resizer.css({right: -delta + 'px'})
    } else {
      delta = e.pageY - coords.bottom
      value = coords.height + delta
      $resizer.css({bottom: -delta + 'px'})
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;

    if (type === 'col') {
      $root.findAll(`[data-col="${$parent.data.col}"]`)
          .forEach(el => $(el).css({width: value + 'px'}))
    } else {
      $parent.css({height: value + 'px'})
    }

    $resizer.css({
      right: 0,
      opacity: 0,
      bottom: 0
    })
  }
}