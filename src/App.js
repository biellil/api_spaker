import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    const fetchStatistics = async () => {
      const response = await axios.get('/api/spark/statistics');
      setStatistics(response.data);
    };
    fetchStatistics();
    const intervalId = setInterval(fetchStatistics, 5000); // atualiza as estatísticas a cada 5 segundos
    return () => clearInterval(intervalId); // limpa o intervalo quando o componente é desmontado
  }, []);

  return (
    <div>
      <h1>Spark Statistics</h1>
      <p>TPS: {statistics.tps}</p>
      <p>MSPT Mean: {statistics.msptMean}</p>
      <p>MSPT 95th Percentile: {statistics.mspt95Percentile}</p>
      <p>CPU Usage: {statistics.cpuUsage}</p>
      <h2>Garbage Collectors:</h2>
      <ul>
        {Object.keys(statistics.gc).map((gcName) => (
          <li key={gcName}>
            {gcName}: avgFrequency={statistics.gc[gcName].avgFrequency}, avgTime={statistics.gc[gcName].avgTime}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
