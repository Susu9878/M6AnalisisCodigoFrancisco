import { useCallback, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { getMetricData, createMetricEntry } from "../services/metricsService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

function Dashboard() {
  const [data, setData] = useState([]);
  const [bugs, setBugs] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [storyPoints, setStoryPoints] = useState([]);

  const [newEntry, setNewEntry] = useState({
    developerName: "",
    metricDate: "",
    commits: "",
    bugsFixed: "",
    tasksCompleted: "",
    storyPoints: "",
  });

  const loadAll = useCallback(async () => {
    try {
      const [commits, bugsData, taskData, storyData] = await Promise.all([
        getMetricData("commits"),
        getMetricData("bugs"),
        getMetricData("tasks"),
        getMetricData("storyPoints"),
      ]);

      setData(commits);
      setBugs(bugsData);
      setTasks(taskData);
      setStoryPoints(storyData);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const promedio = data.length > 0 ? (total / data.length).toFixed(1) : 0;

  const maximo = data.length > 0 ? Math.max(...data.map((x) => x.value)) : 0;

  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: "Commits",
        data: data.map((item) => item.value),
        borderColor: "#eb2525",
        backgroundColor: "rgba(235, 37, 37, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const bugChart = {
    labels: bugs.map((item) => item.label),
    datasets: [
      {
        label: "Bugs",
        data: bugs.map((item) => item.value),
        borderColor: "#eb8b25",
        backgroundColor: "rgba(235, 136, 37, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const taskChart = {
    labels: tasks.map((item) => item.label),
    datasets: [
      {
        label: "Tasks",
        data: tasks.map((item) => item.value),
        borderColor: "#9feb25",
        backgroundColor: "rgba(162, 235, 37, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const storyChart = {
    labels: storyPoints.map((item) => item.label),
    datasets: [
      {
        label: "StoryPoints",
        data: storyPoints.map((item) => item.value),
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewEntry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createMetricEntry({
        developerName: newEntry.developerName,
        metricDate: newEntry.metricDate,
        commits: Number(newEntry.commits),
        bugsFixed: Number(newEntry.bugsFixed),
        tasksCompleted: Number(newEntry.tasksCompleted),
        storyPoints: Number(newEntry.storyPoints),
      });

      setNewEntry({
        developerName: "",
        metricDate: "",
        commits: "",
        bugsFixed: "",
        tasksCompleted: "",
        storyPoints: "",
      });

      loadAll();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fa",
        padding: "30px",
      }}
    >
      <h1>Dashboard de Métricas</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
          marginBottom: "25px",
          alignItems: "start",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "20px",
          }}
        >
          <MetricCard title="Total Commits" value={total} />
          <MetricCard title="Promedio Diario" value={promedio} />
          <MetricCard title="Máximo" value={maximo} />
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h3>Register Entry</h3>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <input
              type="text"
              name="developerName"
              placeholder="Developer Name"
              value={newEntry.developerName}
              onChange={handleChange}
            />

            <input
              type="date"
              name="metricDate"
              value={newEntry.metricDate}
              onChange={handleChange}
            />

            <input
              type="number"
              name="commits"
              placeholder="Commits"
              value={newEntry.commits}
              onChange={handleChange}
            />

            <input
              type="number"
              name="bugsFixed"
              placeholder="Bugs Fixed"
              value={newEntry.bugsFixed}
              onChange={handleChange}
            />

            <input
              type="number"
              name="tasksCompleted"
              placeholder="Tasks Completed"
              value={newEntry.tasksCompleted}
              onChange={handleChange}
            />

            <input
              type="number"
              name="storyPoints"
              placeholder="Story Points"
              value={newEntry.storyPoints}
              onChange={handleChange}
            />

            <button
              type="submit"
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "10px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Save
            </button>
          </form>
        </div>
      </div>

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          marginBottom: "20px",
        }}
      >
        <h2>Evolución de Commits</h2>
        <Line data={chartData} options={chartOptions} />
      </div>

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          marginBottom: "20px",
        }}
      >
        <h2>Evolución de Bugs</h2>
        <Line data={bugChart} options={chartOptions} />
      </div>

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          marginBottom: "20px",
        }}
      >
        <h2>Evolución de Tasks</h2>
        <Line data={taskChart} options={chartOptions} />
      </div>

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <h2>Evolución de Story Points</h2>
        <Line data={storyChart} options={chartOptions} />
      </div>
    </div>
  );
}

function MetricCard({ title, value }) {
  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <h4
        style={{
          color: "#6b7280",
          marginBottom: "10px",
        }}
      >
        {title}
      </h4>

      <h2>{value}</h2>
    </div>
  );
}

export default Dashboard;
