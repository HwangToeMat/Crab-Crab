document.addEventListener('DOMContentLoaded', () => {
    let selectedMood = '평온';
    
    const moodBtns = document.querySelectorAll('.mood-btn');
    const submitBtn = document.getElementById('submit-btn');
    const journalText = document.getElementById('journal-text');
    const aiResponseSection = document.getElementById('ai-response');
    const aiAdvice = document.getElementById('ai-advice');

    moodBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            moodBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedMood = btn.getAttribute('data-mood');
        });
    });

    submitBtn.addEventListener('click', async () => {
        const content = journalText.value.trim();
        if (!content) {
            alert('오늘의 이야기를 조금이라도 들려주세요!');
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = '마음 전송 중...';
        aiResponseSection.classList.remove('hidden');
        aiAdvice.textContent = '꽃게가 당신의 이야기를 조용히 듣고 있습니다... 🌊';

        try {
            const response = await fetch('http://localhost:8000/api/journal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mood: selectedMood, content: content })
            });
            const data = await response.json();
            aiAdvice.textContent = data.advice;
        } catch (error) {
            aiAdvice.textContent = '통신에 문제가 생겼어요. 하지만 당신의 마음은 잘 전달되었을 거예요.';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = '마음 전송하기';
        }
    });
});
