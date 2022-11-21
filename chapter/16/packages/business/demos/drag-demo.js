const dragLayout = document.querySelector('.drag-layout');
// 被拖拽时的子模块DOM所在序号
let activeIndex = -1;
// 拖拽到某个子模块上口的序号
let dragToIndex = -1;
// 上一次所有子模块顺序的DOM的列表
let prevItems = [];

// 根据DOM来获取在父容器里的序号
function getItemIndex(item) {
  let elem = item;
  let index = -1;
  if (!elem || !elem.parentElement) {
    return index;
  }
  index = 0;
  elem = elem.previousElementSibling;
  while (elem) {
    index++;
    elem = elem.previousElementSibling;
  }
  return index;
}

// 在父容器上监听 拖拽开始事件
dragLayout.addEventListener('dragstart', (e) => {
  const dom = e.target;
  const isItem = dom.classList.contains('drag-item');
  if (isItem) {
    const itemDOMs = document.querySelectorAll('.drag-item');
    prevItems = Array.from(itemDOMs);

    const itemIndex = getItemIndex(dom);
    activeIndex = itemIndex;
    dom.classList.add('active');
  }
});

// 根据拖拽的数据重新排序
function resetItems() {
  if (!prevItems[activeIndex]) {
    return;
  }
  if (dragToIndex >= 0 && dragToIndex < prevItems.length) {
    const newList = prevItems.map((item) => item);
    const [activeItem] = newList.splice(activeIndex, 1);
    if (dragToIndex === 0) {
      newList.unshift(activeItem);
    } else {
      newList.splice(dragToIndex, 0, activeItem);
    }
    Array.from(dragLayout.children).forEach((child) => {
      dragLayout.removeChild(child);
    });
    newList.forEach((item) => {
      dragLayout.appendChild(item);
    });
  }
}

// 监听拖拽过程中的事件，
// 用来计算移动到某个子模块“上空”
dragLayout.addEventListener('dragover', (e) => {
  e.preventDefault();
  const dom = e.target;
  const isItem = dom.classList.contains('drag-item');
  if (isItem) {
    const overItemIndex = getItemIndex(dom);
    dragToIndex = overItemIndex;
    resetItems();
  }
});

// 渲染结束，更新数据
dragLayout.addEventListener('dragend', (e) => {
  e.preventDefault();
  prevItems.forEach((item) => {
    item.classList.remove('active');
  });
  dragToIndex = -1;
  activeIndex = -1;
});
