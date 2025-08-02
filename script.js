async function loadJSON() {
    // fetch('data.json')
    // .then(response => {
    //     if (!response.ok) throw new Error(`HTTP错误! 状态码: ${response.status}`);
    //     return response.json();
    // })
    // .then(data => console.log("加载成功", data))
    // .catch(err => console.error("失败原因:", err));
    try {
        const response = await fetch('data.json'); // 同目录下的 JSON 文件
        if (!response.ok) throw new Error('文件加载失败');
        return await response.json();
    } catch (error) {
        console.error('加载JSON出错:', error);
        return []; // 返回空数组避免后续出错
    }
}

async function searchContent() {
    const searchValue = document.getElementById('searchInput').value.trim().toUpperCase();
    const resultsContainer = document.getElementById('results');
    
    // 清空结果容器
    resultsContainer.innerHTML = '';
    
    if (!searchValue) {
        resultsContainer.innerHTML = '<p class="error">请输入有效的序号</p>';
        return;
    }
    
    // 在JSON数据中查找匹配项
    const jsonData = await loadJSON();
    const results = jsonData.filter(item => item.id === searchValue);
    
    if (results.length === 0) {
        resultsContainer.innerHTML = '<p class="no-results">未找到 <span class="highlight">' + 
                                    searchValue + '</span></p>';
        return;
    }

    const diffcolor=["#BFBFBF","#FE4C61","#F39C11","#FFC31C","#52C41A","#3498DB","#9D3DCF","#0E1D69"];
    const difftext=["暂无评定","入门","普及-","普及/提高-","普及+/提高","提高+/省选-","省选/NOI-","NOI/NOI+/CTSC"];
    
    // 显示匹配结果
    results.forEach(item => {
        const resultElement = document.createElement('div');
        resultElement.className = 'result-item';
        
        // // 高亮显示搜索词
        // const highlightedContent = item.content.replace(
        //     new RegExp(searchValue, 'gi'), 
        //     match => `<span class="highlight">${match}</span>`
        // );
        
        resultElement.innerHTML = `
            <div class="problembox">
                <h3 style="margin-top:-3px;">${item.title}</h3>
                <span class="difftag" style="background-color:${diffcolor[item.diff]};">&nbsp;${difftext[item.diff]}&nbsp;</span><br><br>
            </div>
            <div class="ansbox" id="ansbox1">
                <button class="hintbtn" id="hintbtn1">提示 1</button>
                <p id="hintext1">${item.hint1}</p>
            </div>
            <div class="ansbox" id="ansbox2">
                <button class="hintbtn" id="hintbtn2">提示 2</button>
                <p id="hintext2">${item.hint2}</p>
            </div>
            <div class="ansbox" id="ansbox3">
                <button class="hintbtn" id="hintbtn3">提示 3</button>
                <p id="hintext3">${item.hint3}</p>
            </div>
            <div class="ansbox" id="ansbox4">
                <button class="hintbtn" id="hintbtn4">提示 4</button>
                <p id="hintext4">${item.hint4}</p>
            </div>
            <div class="ansbox" id="ansbox5">
                <button class="hintbtn" id="hintbtn5">提示 5</button>
                <p id="hintext5">${item.hint5}</p>
            </div>
        `;
        
        resultsContainer.appendChild(resultElement);
        
        const btn1=document.getElementById("hintbtn1");const div1=document.getElementById("hintext1");const box1=document.getElementById("ansbox1");
        const btn2=document.getElementById("hintbtn2");const div2=document.getElementById("hintext2");const box2=document.getElementById("ansbox2");
        const btn3=document.getElementById("hintbtn3");const div3=document.getElementById("hintext3");const box3=document.getElementById("ansbox3");
        const btn4=document.getElementById("hintbtn4");const div4=document.getElementById("hintext4");const box4=document.getElementById("ansbox4");
        const btn5=document.getElementById("hintbtn5");const div5=document.getElementById("hintext5");const box5=document.getElementById("ansbox5");
        
        btn1.addEventListener("click",()=>{btn1.classList.toggle("hintbtndown");div1.classList.toggle("transhint");box1.classList.toggle("bigansbox");});
        btn2.addEventListener("click",()=>{btn2.classList.toggle("hintbtndown");div2.classList.toggle("transhint");box2.classList.toggle("bigansbox");});
        btn3.addEventListener("click",()=>{btn3.classList.toggle("hintbtndown");div3.classList.toggle("transhint");box3.classList.toggle("bigansbox");});
        btn4.addEventListener("click",()=>{btn4.classList.toggle("hintbtndown");div4.classList.toggle("transhint");box4.classList.toggle("bigansbox");});
        btn5.addEventListener("click",()=>{btn5.classList.toggle("hintbtndown");div5.classList.toggle("transhint");box5.classList.toggle("bigansbox");});
    });
}

// 添加键盘支持
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchContent();
    }
});