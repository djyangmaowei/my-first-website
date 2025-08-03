// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function () {
    // 初始化所有功能
    initMobileMenu();
    initScrollEffects();
    initFormValidation();
});

// 移动端菜单功能
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // 点击导航链接时关闭菜单
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// 滚动效果
function initScrollEffects() {
    // 导航栏滚动效果
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 表单验证和处理
function initFormValidation() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            handleSubmit(e);
        });
    }
}

// 显示消息函数
function showMessage() {
    // 创建消息元素
    const message = document.createElement('div');
    message.className = 'message-popup';
    message.innerHTML = `
        <div class="message-content">
            <h3>🎉 欢迎！</h3>
            <p>感谢你点击了这个按钮！这是一个使用JavaScript创建的交互效果。</p>
            <button onclick="closeMessage()" class="close-button">关闭</button>
        </div>
    `;

    // 添加样式
    message.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;

    // 添加消息内容样式
    const messageContent = message.querySelector('.message-content');
    messageContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        max-width: 400px;
        margin: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease;
    `;

    // 添加关闭按钮样式
    const closeButton = message.querySelector('.close-button');
    closeButton.style.cssText = `
        background: #2563eb;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        cursor: pointer;
        margin-top: 1rem;
        font-weight: 500;
        transition: background 0.3s ease;
    `;

    closeButton.addEventListener('mouseenter', () => {
        closeButton.style.background = '#1d4ed8';
    });

    closeButton.addEventListener('mouseleave', () => {
        closeButton.style.background = '#2563eb';
    });

    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    // 添加到页面
    document.body.appendChild(message);

    // 点击背景关闭
    message.addEventListener('click', function (e) {
        if (e.target === message) {
            closeMessage();
        }
    });
}

// 关闭消息函数
function closeMessage() {
    const message = document.querySelector('.message-popup');
    if (message) {
        message.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            message.remove();
        }, 300);
    }
}

// 表单提交处理
function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    // 获取表单数据
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // 简单的表单验证
    if (!name || !email || !message) {
        showNotification('请填写所有必填字段！', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showNotification('请输入有效的邮箱地址！', 'error');
        return;
    }

    // 模拟表单提交
    showNotification('消息发送成功！我们会尽快回复您。', 'success');

    // 清空表单
    form.reset();
}

// 邮箱验证
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 显示通知
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // 设置样式
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6'
    };

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 10001;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;

    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // 添加到页面
    document.body.appendChild(notification);

    // 3秒后自动移除
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// 星座查询功能
function checkZodiac() {
    const birthdayInput = document.getElementById('birthday');
    const birthday = birthdayInput.value;

    if (!birthday) {
        showNotification('请选择你的生日！', 'error');
        return;
    }

    const date = new Date(birthday);
    const month = date.getMonth() + 1; // getMonth() 返回 0-11
    const day = date.getDate();

    const zodiac = getZodiacSign(month, day);
    displayZodiacResult(zodiac);

    // 滚动到结果区域
    const resultElement = document.getElementById('zodiacResult');
    resultElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// 根据月份和日期获取星座
function getZodiacSign(month, day) {
    const zodiacData = [
        {
            name: '摩羯座', icon: '♑', startMonth: 12, startDay: 22, endMonth: 1, endDay: 19,
            description: '摩羯座的人务实、有责任感，是天生的领导者。他们目标明确，意志坚定，能够克服任何困难。'
        },
        {
            name: '水瓶座', icon: '♒', startMonth: 1, startDay: 20, endMonth: 2, endDay: 18,
            description: '水瓶座的人独立、创新，思维独特。他们追求自由，富有同情心，喜欢帮助他人。'
        },
        {
            name: '双鱼座', icon: '♓', startMonth: 2, startDay: 19, endMonth: 3, endDay: 20,
            description: '双鱼座的人富有同情心、直觉敏锐，具有艺术天赋。他们温柔善良，容易理解他人的感受。'
        },
        {
            name: '白羊座', icon: '♈', startMonth: 3, startDay: 21, endMonth: 4, endDay: 19,
            description: '白羊座的人充满活力，勇敢无畏，是天生的领导者。他们行动力强，喜欢挑战新事物。'
        },
        {
            name: '金牛座', icon: '♉', startMonth: 4, startDay: 20, endMonth: 5, endDay: 20,
            description: '金牛座的人稳重、务实，重视物质享受。他们耐心十足，一旦决定就会坚持到底。'
        },
        {
            name: '双子座', icon: '♊', startMonth: 5, startDay: 21, endMonth: 6, endDay: 21,
            description: '双子座的人聪明、好奇，善于沟通。他们思维敏捷，适应能力强，但有时缺乏耐心。'
        },
        {
            name: '巨蟹座', icon: '♋', startMonth: 6, startDay: 22, endMonth: 7, endDay: 22,
            description: '巨蟹座的人情感丰富，重视家庭。他们保护欲强，记忆力好，对朋友忠诚。'
        },
        {
            name: '狮子座', icon: '♌', startMonth: 7, startDay: 23, endMonth: 8, endDay: 22,
            description: '狮子座的人自信、慷慨，具有王者气质。他们热情开朗，喜欢成为焦点，领导能力强。'
        },
        {
            name: '处女座', icon: '♍', startMonth: 8, startDay: 23, endMonth: 9, endDay: 22,
            description: '处女座的人完美主义，注重细节。他们理性、务实，善于分析问题，追求完美。'
        },
        {
            name: '天秤座', icon: '♎', startMonth: 9, startDay: 23, endMonth: 10, endDay: 23,
            description: '天秤座的人追求平衡，公正公平。他们优雅、有魅力，善于处理人际关系。'
        },
        {
            name: '天蝎座', icon: '♏', startMonth: 10, startDay: 24, endMonth: 11, endDay: 22,
            description: '天蝎座的人神秘、洞察力强，意志坚定。他们情感深刻，忠诚可靠，但有时过于敏感。'
        },
        {
            name: '射手座', icon: '♐', startMonth: 11, startDay: 23, endMonth: 12, endDay: 21,
            description: '射手座的人乐观、自由，热爱冒险。他们思想开放，喜欢旅行，追求知识和真理。'
        }
    ];

    for (let zodiac of zodiacData) {
        if (isInZodiacPeriod(month, day, zodiac)) {
            return zodiac;
        }
    }

    return zodiacData[0]; // 默认返回摩羯座
}

// 判断日期是否在星座期间内
function isInZodiacPeriod(month, day, zodiac) {
    if (zodiac.startMonth === 12 && zodiac.endMonth === 1) {
        // 处理跨年的星座（摩羯座）
        return (month === 12 && day >= zodiac.startDay) || (month === 1 && day <= zodiac.endDay);
    } else {
        if (zodiac.startMonth < zodiac.endMonth) {
            // 正常情况
            return (month === zodiac.startMonth && day >= zodiac.startDay) ||
                (month === zodiac.endMonth && day <= zodiac.endDay) ||
                (month > zodiac.startMonth && month < zodiac.endMonth);
        } else {
            // 跨年情况
            return (month === zodiac.startMonth && day >= zodiac.startDay) ||
                (month === zodiac.endMonth && day <= zodiac.endDay) ||
                (month > zodiac.startMonth || month < zodiac.endMonth);
        }
    }
}

// 显示星座结果
function displayZodiacResult(zodiac) {
    const resultElement = document.getElementById('zodiacResult');
    const iconElement = document.getElementById('zodiacIcon');
    const nameElement = document.getElementById('zodiacName');
    const dateElement = document.getElementById('zodiacDate');
    const descriptionElement = document.getElementById('zodiacDescription');

    // 更新内容
    iconElement.textContent = zodiac.icon;
    nameElement.textContent = zodiac.name;
    dateElement.textContent = getZodiacDateRange(zodiac);
    descriptionElement.textContent = zodiac.description;

    // 显示结果
    resultElement.style.display = 'block';

    // 添加动画效果
    resultElement.style.animation = 'none';
    setTimeout(() => {
        resultElement.style.animation = 'fadeInUp 0.6s ease-out';
    }, 10);
}

// 获取星座日期范围
function getZodiacDateRange(zodiac) {
    const monthNames = ['', '1月', '2月', '3月', '4月', '5月', '6月',
        '7月', '8月', '9月', '10月', '11月', '12月'];

    if (zodiac.startMonth === 12 && zodiac.endMonth === 1) {
        return `${monthNames[12]}${zodiac.startDay}日 - ${monthNames[1]}${zodiac.endDay}日`;
    } else {
        return `${monthNames[zodiac.startMonth]}${zodiac.startDay}日 - ${monthNames[zodiac.endMonth]}${zodiac.endDay}日`;
    }
}

// 添加页面加载动画
window.addEventListener('load', function () {
    // 为特性卡片添加延迟动画
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
        feature.style.animationDelay = `${index * 0.2}s`;
    });

    // 添加滚动显示动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 观察所有需要动画的元素
    document.querySelectorAll('.feature, .contact-form, .zodiac-form').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}); 