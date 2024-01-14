// V0 最原生的创建 dom 节点并添加到页面文档流写法
// const app = document.createElement('div');
// app.id = 'parent';

// const textNode = document.createTextNode('textNode');
// textNode.nodeValue = "app";

// app.append(textNode);

// const container = document.getElementById('root');
// container.appendChild(app);

// V1 将需要创建的节点信息提取为独立的数据对象，节点创建和添加的写法不变，以旧使用原生写法
// const textEl = {
//     type: "TEXT_ELEMENT",
//     props: {
//         nodeValue: 'textNode',
//     }
// }

// const appEl = {
//     type: 'div',
//     props: {
//         id: "app",
//         children: [textEl]
//     }
// }

// const app = document.createElement(appEl.type);
// app.id = appEl.props.id;

// appEl.props.children.forEach((el) => {
//     const textNode = document.createTextNode(el.props.nodeValue);
//     app.append(textNode);
// })

// document.getElementById('root').append(app);

// V2 将节点的创建过程使用函数封装起来，以便能更动态化创建不同的节点
// function createElement(type, props, ...children) {
//     return {
//         type,
//         props: {
//             ...props,
//             children
//         }
//     }
// }

// function createTextElement(nodeValue, props) {
//     return {
//         type: "TEXT_ELEMENT",
//         props: {
//             ...props,
//             nodeValue
//         }
//     }
// }

// const textEl = createTextElement('textNode');

// const appEl = createElement('div', { id: 'app' }, textEl);

// const app = document.createElement(appEl.type);

// Object.keys(appEl.props).forEach(key => {
//     if (key !== 'children') {
//         app[key] = appEl[key];
//     }
// })

// appEl.props.children.forEach((el) => {
//     const textNode = document.createTextNode(el.props.nodeValue);
//     app.append(textNode);
// })

// document.getElementById('root').append(app);


// V3 将 dom 节点的创建和渲染也封装到一个函数里
function createTextElement(nodeValue) {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue
        }
    }
}

function createElement(type, props, ...children) {
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

function render(el, container) {
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
            render(el, dom);
        })
    }

    container.append(dom);
}

const App = createElement('div', { id: 'app' }, 'mini-', 'react-', 'demo')

render(App, document.getElementById('root'));
