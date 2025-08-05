import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function Popup() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/logs")
      .then((res) => res.json())
      .then((data) => setLogs(data))
      .catch((err) => console.error("Failed to load logs", err));
  }, []);

  const totalTime = logs.reduce((sum, log) => sum + log.duration, 0);

  return (
    <div style={{ padding: 12, fontFamily: 'Arial' }}>
      <h3>🕒 Productivity Report</h3>
      <ul style={{ paddingLeft: 18 }}>
        {logs.map((log, i) => (
          <li key={i}>
            {log.domain} — {log.duration}s
          </li>
        ))}
      </ul>
      <hr />
      <b>Total time:</b> {totalTime} sec
    </div>
  );
}

ReactDOM.render(<Popup />, document.getElementById('root'));
