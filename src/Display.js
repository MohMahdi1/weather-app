import "../src/index.css";

export default function DisplayData({ weatherData }) {
  return (
    <div className="displaydata">
      {weatherData.time.map((date, index) => (
        <div className="containers" key={index}>
          <h2>{date}</h2>
          <p>Max temp: {weatherData.temperature_2m_max[index]}°C</p>
          <p>Min temp: {weatherData.temperature_2m_min[index]}°C</p>
        </div>
      ))}
    </div>
  );
}
