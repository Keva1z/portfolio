import React, { useEffect, useState } from 'react';

export default function Thoughts() {
    const [thoughts, setThoughts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Функция для загрузки мыслей с сервера
    const fetchThoughts = async () => {
        try {
            setError(null);
            const response = await fetch('https://ваш-бэкенд.ru/api/thoughts');
            if (!response.ok) throw new Error('Не удалось загрузить мысли');

            const data = await response.json();
            // Сортируем по дате (новые первыми)
            const sorted = (data.thoughts || []).sort((a, b) =>
                new Date(b.createdAt) - new Date(a.createdAt)
            );
            setThoughts(sorted);
        } catch (err) {
            setError(err.message);
            console.error('Ошибка загрузки мыслей:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Загрузить мысли при монтировании
        fetchThoughts();

        // Установить интервал для авто-обновления каждые 30 секунд
        const interval = setInterval(fetchThoughts, 30000);

        return () => clearInterval(interval);
    }, []);

    // Форматирование даты и времени
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return date.toLocaleDateString('ru-RU', options);
    };

    return (
        <div className="thoughts-container">
            {loading && (
                <div className="thoughts-loading">
                    <p>Загрузка мыслей...</p>
                </div>
            )}

            {error && (
                <div className="thoughts-error">
                    <p>⚠️ {error}</p>
                    <button className="thoughts-retry" onClick={fetchThoughts}>
                        Попробовать снова
                    </button>
                </div>
            )}

            {!loading && thoughts.length === 0 && !error && (
                <div className="thoughts-empty">
                    <p>Мыслей пока нет 🤔</p>
                </div>
            )}

            <div className="thoughts-list">
                {thoughts.map((thought) => (
                    <div key={thought.id} className="thought-card">
                        <p className="thought-text">{thought.text}</p>
                        <div className="thought-meta">
                            <time dateTime={thought.createdAt}>
                                {formatDate(thought.createdAt)}
                            </time>
                        </div>
                    </div>
                ))}
            </div>

            <div className="thoughts-footer">
                <button className="btn btn--outline" onClick={fetchThoughts}>
                    Обновить
                </button>
            </div>
        </div>
    );
}
