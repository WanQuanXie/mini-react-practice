// 这里为了更贴近 React，直接将渲染函数改为一致
function createRoot(el, container) {
    const isTextEl = el.type === "TEXT_ELEMENT";
    const dom = isTextEl ? document.createTextNode(el.props.nodeValue) : document.createElement(el.type);

    Object.keys(el.props).forEach(key => {
        if (key !== 'children') {
            dom[key] = el.props[key];
        }
    })

    if (!isTextEl) {
        el.props.children.forEach((el) => {
            // 这里递归添加所有的子节点
            createRoot(el, dom);
        })
    }

    container.append(dom);
}

export default {
    createRoot
}