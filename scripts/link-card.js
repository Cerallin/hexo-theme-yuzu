// Copied and modified from 
// https://github.com/OrangeX4/hexo-link-card/blob/main/index.js
//
// MIT License
//
// Copyright (c) 2022 OrangeX4
// Copyright (c) 2024 Cerallin
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
//
function linkCard(args) {
    const title = args.shift();
    const url = args.shift();

    return [
        `<a target="_blank" href="${url}" class="link-card">`,
        `  <span class="link-card-title">${title}</span>`,
        `  <span class="link-card-link">`,
        '    <span class="link-card-icon">',
        '      <i class="icon icon-link-45deg"></i>',
        '    </span>',
        `    <span>${url}</span>`,
        '  </span>',
        '</a>',
    ].map(s => s.trim()).join('');
}

hexo.extend.tag.register('link_card', linkCard);
