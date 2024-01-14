export function createTextElement(nodeValue) {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue
        }
    }
}

export function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            // 这里优化一下子节点对象的处理，以便外边调用该方法创建节点对象，不需要在传入 textNode 类型时先创建再传入
            children: children.map(child => {
                return typeof child === "string" ? createTextElement(child) : child
            })
        }
    }
}

