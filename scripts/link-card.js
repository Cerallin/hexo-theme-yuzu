// Copied and edited from https://github.com/OrangeX4/hexo-link-card/blob/main/index.js
//
// MIT License
//
// Copyright (c) 2022 OrangeX4
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
function linkCard(args) {
    const title = args.shift();
    const url = args.shift();

    const backgroundColor = '#F6F6F6';
    const titleColor = '#121212';
    const descColor = '#999';

    const styleText = [
        'position: relative;',
        'display: flex;',
        'box-sizing: border-box;',
        'flex-direction: row;',
        'align-items: center;',
        'width: 420px;',
        'min-height: 84px;',
        'border-radius: 8px;',
        'max-width: 100%;',
        'overflow: hidden;',
        'margin: 16px auto;',
        'padding: 12px 20px 9px 20px;',
        `background-color: ${backgroundColor};`,
    ].join('');

    const innerStyleText = [
        'display: flex;',
        'overflow: hidden;',
        'text-overflow: ellipsis;',
        'max-height: 40px;',
        'line-height: 1.25;',
        `color: ${titleColor};`,
    ].join('');

    const svgStyleText = [
        'display: flex;',
        'font-size: 13px;',
        'height: 18px;',
        'line-height: 18px;',
        `color: ${descColor};`,
        'word-break: break-all;',
        'text-overflow: ellipsis;',
        'overflow: hidden;',
    ].join('');

    return [
        `<a target="_blank" href="${url}" style="${styleText}">`,
        '  <span class="LinkCard-contents">',
        `    <span style="${innerStyleText}">${title}</span>`,
        `    <span style="${svgStyleText}">`,
        '      <span style="display: inline-flex; align-items: center;">',
        '        <i class="icon icon-link-45deg"></i>',
        '      </span>',
        `      <span>${url}</span>`,
        '    </span>',
        '  </span>',
        '</a>',
    ].map(s => s.trim()).join('');
}

hexo.extend.tag.register('link_card', linkCard);
