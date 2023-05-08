import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { RCON } from 'minecraft-server-util';

const SERVER_IP = "127.0.0.1"; // IP do servidor Minecraft
const SERVER_PORT = 25575; // porta rcon do servidor Minecraft
const RCON_PASSWORD = "senha_rcon"; // senha rcon do servidor Minecraft

const socket = io(`http://${SERVER_IP}:${SERVER_PORT}`);

const MinecraftServerInfo: React.FC = () => {
  const [players, setPlayers] = useState<string[]>([]);
  const [tps, setTps] = useState<number>(0);

  useEffect(() => {
    const getServerInfo = async () => {
      try {
        const rcon: RCON = await RCON.create(SERVER_IP, SERVER_PORT, { password: RCON_PASSWORD });
        const [tpsResponse, playersResponse] = await Promise.all([
          rcon.sendCommand("tps"),
          rcon.sendCommand("list"),
        ]);
        const tps = parseFloat(tpsResponse.split(": ")[1]);
        const players = playersResponse.split(": ")[1].split(", ");
        setTps(tps);
        setPlayers(players);
      } catch (err) {
        console.log(err);
      } finally {
        RCON.end();
      }
    };

    getServerInfo();
    const interval = setInterval(getServerInfo, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Desempenho do Servidor:</h2>
      <p>TPS: {tps.toFixed(2)}</p>
      <p>Jogadores: {players.join(", ")}</p>
    </div>
  );
};

export default MinecraftServerInfo;
