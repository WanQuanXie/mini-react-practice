// V0 最原生的创建 dom 节点并添加到页面文档流写法
const app = document.createElement('div');
app.id = 'parent';

const textNode = document.createTextNode('textNode');
textNode.nodeValue = "app";

app.append(textNode);

const container = document.getElementById('root');
container.appendChild(app);

