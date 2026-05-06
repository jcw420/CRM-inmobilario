import React, { useState, useEffect } from 'react';
import { Home, Map, Users, Calculator, Phone, FileText, Sun, Settings, Search, DollarSign, TrendingUp, Plus, Edit, Trash2, Calendar, Clock, AlertCircle, CheckCircle, Upload, Download, Save, RotateCcw, Move, ZoomIn, ZoomOut, Copy, Mail } from 'lucide-react';

const TerrenosApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedLote, setSelectedLote] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [clientesSelectos, setClientesSelectos] = useState([]);
  const [lotesData, setLotesData] = useState([]);
  const [planosAdjuntos, setPlanosAdjuntos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [weather, setWeather] = useState(null);

  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    const savedClientes = localStorage.getItem('clientes');
    const savedSelectos = localStorage.getItem('clientesSelectos');
    const savedLotes = localStorage.getItem('lotesData');
    const savedPlanos = localStorage.getItem('planosAdjuntos');
    
    if (savedClientes) setClientes(JSON.parse(savedClientes));
    if (savedSelectos) setClientesSelectos(JSON.parse(savedSelectos));
    if (savedLotes) setLotesData(JSON.parse(savedLotes));
    if (savedPlanos) setPlanosAdjuntos(JSON.parse(savedPlanos));
  }, []);

  // Guardar datos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('clientes', JSON.stringify(clientes));
  }, [clientes]);

  useEffect(() => {
    localStorage.setItem('clientesSelectos', JSON.stringify(clientesSelectos));
  }, [clientesSelectos]);

  useEffect(() => {
    localStorage.setItem('lotesData', JSON.stringify(lotesData));
  }, [lotesData]);

  useEffect(() => {
    localStorage.setItem('sAdjuntos', JSON.stringify(sAdjuntos));
  }, [sAdjuntos]);

  const proyectoInfo = {
    nombre: "Pre-Venta Lotes",
    ubicacion: "El Dorado, Lomas del Valle, Mexicali, B.C.",
    precioTotal: 560000,
    enganche: 33600,
    mensualidad: 4500,
    plazo: 123,
    superficieLote: 200,
    registro: "PROFECO 1671/2023 y 0558/2026",
    amenidades: ["Área verde con asador y sombra", "Playground infantil", "Corredor perimetral", "Factibilidad de luz", "A Pie de Carretera"],
    nichos: ["Transporte", "Almacen", "Trabajadores y Familias Jovenes", "Fabricas", "Logistica"],
  };

  useEffect(() => {
    fetch('https://historical-forecast-api.open-meteo.com/v1/forecast?latitude=32.6278&longitude=-115.4545&start_date=2020-01-01&end_date=2026-05-06&daily=sunrise,sunset,daylight_duration,uv_index_max&hourly=temperature_2m,relative_humidity_2m,weather_code,temperature_80m&timezone=auto&temperature_unit=fahrenheit')
      .then(res => res.json())
      .then(data => setWeather(data.current))
      .catch(() => {});
  }, []);

  const tabs = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: '', icon: Map, label: '' },
    { id: 'distribucion', icon: Settings, label: 'Diseña Casa' },
    { id: 'materiales', icon: FileText, label: 'Materiales' },
    { id: 'clientes', icon: Users, label: 'CRM' },
    { id: 'selectos', icon: CheckCircle, label: 'Selectos' },
    { id: 'calculadora', icon: Calculator, label: 'Calculadora' },
    { id: 'contacto', icon: Phone, label: 'Contacto' }
  ];

  return (
    <div className="min-h-screen bg-black">
      <header className="bg-gradient-to-r from-orange-600 via-orange-500 to-black text-white shadow-2xl border-b-4 border-orange-500">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <Home className="w-10 h-10 text-orange-300" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Terrenos Islas Agrarias</h1>
                <p className="text-xs md:text-sm text-orange-200">Sistema de Ventas Premium</p>
              </div>
            </div>
            <div className="text-right bg-black bg-opacity-30 rounded-lg px-4 py-2">
              <p className="font-bold text-2xl text-orange-400">${proyectoInfo.precioTotal.toLocaleString()}</p>
              <p className="text-xs text-orange-200">Desde ${proyectoInfo.mensualidad.toLocaleString()}/mes</p>
            </div>
          </div>
        </div>
      </header>

      {weather && (
        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-2 text-center">
          <p className="text-sm font-semibold">
            🌡️ Mexicali AHORA: {Math.round(weather.temperature_2m)}°C 
            <span className="ml-3 text-yellow-200">⚠️ CALOR EXTREMO CACHANILLA</span>
          </p>
        </div>
      )}

      <nav className="bg-gradient-to-r from-gray-900 to-black shadow-lg sticky top-0 z-40 border-b-2 border-orange-500">
        <div className="container mx-auto px-2">
          <div className="flex overflow-x-auto gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 whitespace-nowrap transition-all ${
                  activeTab === tab.id 
                    ? 'bg-orange-600 text-white font-bold border-b-4 border-orange-400' 
                    : 'text-gray-300 hover:text-orange-400 hover:bg-gray-800'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="text-sm">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-6">
        {activeTab === 'dashboard' && <Dashboard proyectoInfo={proyectoInfo} clientes={clientes} clientesSelectos={clientesSelectos} />}
        {activeTab === '' && <PlanoInteractivo lotesData={lotesData} setLotesData={setLotesData} planosAdjuntos={planosAdjuntos} setPlanosAdjuntos={setPlanosAdjuntos} selectedLote={selectedLote} setSelectedLote={setSelectedLote} setShowModal={setShowModal} proyectoInfo={proyectoInfo} />}
        {activeTab === 'distribucion' && <DisenatuCasa />}
        {activeTab === 'materiales' && <GuiaMateriales />}
        {activeTab === 'clientes' && <CRMClientes clientes={clientes} setClientes={setClientes} clientesSelectos={clientesSelectos} setClientesSelectos={setClientesSelectos} />}
        {activeTab === 'selectos' && <ClientesSelectos clientesSelectos={clientesSelectos} setClientesSelectos={setClientesSelectos} proyectoInfo={proyectoInfo} />}
        {activeTab === 'calculadora' && <Calculadora proyectoInfo={proyectoInfo} />}
        {activeTab === 'contacto' && <Contacto />}
      </main>

      {showModal && (
        <ModalCaptura 
          lote={selectedLote} 
          proyectoInfo={proyectoInfo}
          onClose={() => setShowModal(false)} 
          onSave={(data) => {
            if (data.apartado) {
              setClientesSelectos([...clientesSelectos, { ...data, id: Date.now(), fecha: new Date().toLocaleDateString() }]);
            } else {
              setClientes([...clientes, { ...data, id: Date.now(), fecha: new Date().toLocaleDateString() }]);
            }
            setShowModal(false);
            alert('¡Cliente registrado exitosamente!');
          }}
        />
      )}
    </div>
  );
};

const Dashboard = ({ proyectoInfo, clientes, clientesSelectos }) => {
  const stats = [
    { label: 'Prospectos', value: clientes.length, icon: Users, color: 'orange' },
    { label: 'Lotes Disponibles', value: 42, icon: Map, color: 'orange' },
    { label: 'Clientes Selectos', value: clientesSelectos.length, icon: CheckCircle, color: 'orange' },
    { label: 'Ventas Cerradas', value: 6, icon: DollarSign, color: 'orange' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-2xl p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs">{stat.label}</p>
                <p className="text-3xl font-bold text-orange-400">{stat.value}</p>
              </div>
              <stat.icon className="w-12 h-12 text-orange-500 opacity-30" />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-2xl p-6 border-2 border-orange-500">
        <h2 className="text-2xl font-bold mb-4 text-orange-400">📍 Información del Proyecto</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black bg-opacity-50 p-4 rounded-lg border border-orange-500">
            <p className="text-xs text-gray-400">Ubicación Premium</p>
            <p className="font-semibold text-white">{proyectoInfo.ubicacion}</p>
          </div>
          <div className="bg-black bg-opacity-50 p-4 rounded-lg border border-orange-500">
            <p className="text-xs text-gray-400">Superficie por Lote</p>
            <p className="font-semibold text-orange-400">{proyectoInfo.superficieLote} m²</p>
          </div>
          <div className="bg-black bg-opacity-50 p-4 rounded-lg border border-orange-500">
            <p className="text-xs text-gray-400">Precio Total</p>
            <p className="font-semibold text-2xl text-orange-400">${proyectoInfo.precioTotal.toLocaleString()}</p>
          </div>
          <div className="bg-black bg-opacity-50 p-4 rounded-lg border border-orange-500">
            <p className="text-xs text-gray-400">Enganche Inicial</p>
            <p className="font-semibold text-2xl text-orange-400">${proyectoInfo.enganche.toLocaleString()}</p>
          </div>
          <div className="bg-black bg-opacity-50 p-4 rounded-lg border border-orange-500">
            <p className="text-xs text-gray-400">Mensualidad</p>
            <p className="font-semibold text-2xl text-orange-400">${proyectoInfo.mensualidad.toLocaleString()}</p>
          </div>
          <div className="bg-black bg-opacity-50 p-4 rounded-lg border border-orange-500">
            <p className="text-xs text-gray-400">Plazo</p>
            <p className="font-semibold text-orange-400">{proyectoInfo.plazo / 12} años ({proyectoInfo.plazo} meses)</p>
          </div>
        </div>
        <div className="mt-6 bg-gradient-to-r from-orange-600 to-orange-800 rounded-lg p-4 border-2 border-orange-400">
          <p className="text-sm text-white font-semibold">📋 Registro PROFECO: {proyectoInfo.registro}</p>
          <p className="text-lg text-white font-bold mt-2">✅ Sin intereses • Sin aval • Sin buró de crédito</p>
        </div>
        <div className="mt-4 bg-gradient-to-r from-gray-800 to-black rounded-lg p-4 border border-orange-500">
          <h3 className="text-orange-400 font-bold mb-2">🌿 Amenidades Premium:</h3>
          <div className="grid grid-cols-2 gap-2">
            {proyectoInfo.amenidades.map((am, i) => (
              <p key={i} className="text-white text-sm">• {am}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PlanoInteractivo = ({ lotesData, setLotesData, planosAdjuntos, setPlanosAdjuntos, selectedLote, setSelectedLote, setShowModal, proyectoInfo }) => {
  const [manzana, setManzana] = useState('A');
  const [editandoLote, setEditandoLote] = useState(null);
  const [verPlanos, setVerPlanos] = useState(false);

  useEffect(() => {
    if (lotesData.length === 0) {
      const lotesIniciales = Array.from({ length: 48 }, (_, i) => ({
        id: i + 1,
        numero: `${manzana}-${String(i + 1).padStart(2, '0')}`,
        estatus: Math.random() > 0.3 ? 'disponible' : 'vendido',
        superficie: 200,
        precio: 400000,
        manzana: manzana,
        notas: ''
      }));
      setLotesData(lotesIniciales);
    }
  }, []);

  const lotesActuales = lotesData.filter(l => l.manzana === manzana);

  const handleLoteClick = (lote) => {
    if (lote.estatus === 'disponible') {
      setSelectedLote(lote);
      setShowModal(true);
    }
  };

  const actualizarLote = (loteId, datos) => {
    setLotesData(lotesData.map(l => l.id === loteId ? { ...l, ...datos } : l));
    setEditandoLote(null);
  };

  const eliminarLote = (loteId) => {
    if (confirm('¿Eliminar este lote?')) {
      setLotesData(lotesData.filter(l => l.id !== loteId));
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPlanosAdjuntos([...planosAdjuntos, {
          id: Date.now(),
          nombre: file.name,
          tipo: file.type,
          data: event.target.result,
          fecha: new Date().toLocaleDateString()
        }]);
      };
      reader.readAsDataURL(file);
    }
  };

  const comision5 = proyectoInfo.enganche * 0.05;
  const comision10 = proyectoInfo.enganche * 0.10;

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-2xl p-6 border-2 border-orange-500">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-orange-400">🗺️ Plano Maestro del Proyecto</h2>
          <div className="flex gap-2">
            <label className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-4 py-2 rounded-lg font-bold cursor-pointer hover:from-orange-500 hover:to-orange-600 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Subir Plano
              <input type="file" accept=".pdf,image/*" onChange={handleFileUpload} className="hidden" />
            </label>
            <button
              onClick={() => setVerPlanos(!verPlanos)}
              className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-4 py-2 rounded-lg font-bold hover:from-gray-600 hover:to-gray-700 flex items-center gap-2"
            >
              <FileText className="w-5 h-5" />
              Ver Planos ({planosAdjuntos.length})
            </button>
          </div>
        </div>

        {verPlanos && planosAdjuntos.length > 0 && (
          <div className="mb-4 bg-black bg-opacity-50 p-4 rounded-lg border-2 border-orange-500">
            <h3 className="text-orange-400 font-bold mb-3">📎 Planos Adjuntos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {planosAdjuntos.map(plano => (
                <div key={plano.id} className="bg-gray-900 p-3 rounded border border-orange-500">
                  {plano.tipo.includes('image') ? (
                    <img src={plano.data} alt={plano.nombre} className="w-full h-48 object-contain mb-2 rounded" />
                  ) : (
                    <div className="w-full h-48 flex items-center justify-center bg-gray-800 rounded mb-2">
                      <FileText className="w-16 h-16 text-orange-400" />
                    </div>
                  )}
                  <p className="text-white text-sm font-semibold">{plano.nombre}</p>
                  <p className="text-gray-400 text-xs">{plano.fecha}</p>
                  <div className="flex gap-2 mt-2">
                    <a href={plano.data} download={plano.nombre} className="flex-1 bg-orange-600 text-white px-2 py-1 rounded text-xs text-center">Descargar</a>
                    <button onClick={() => setPlanosAdjuntos(planosAdjuntos.filter(p => p.id !== plano.id))} className="bg-red-600 text-white px-2 py-1 rounded text-xs">Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="mb-4">
          <label className="text-white font-semibold mb-2 block">Selecciona Manzana:</label>
          <select 
            value={manzana}
            onChange={(e) => setManzana(e.target.value)}
            className="w-full md:w-64 p-3 bg-black border-2 border-orange-500 rounded-lg text-orange-400 font-bold"
          >
            {['A', 'B', 'C', 'D', 'E'].map(m => (
              <option key={m} value={m}>Manzana {m}</option>
            ))}
          </select>
        </div>

        <div className="mb-4 flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-orange-500 rounded border-2 border-orange-300"></div>
            <span className="text-white font-semibold">Disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-700 rounded border-2 border-red-500"></div>
            <span className="text-white font-semibold">Vendido</span>
          </div>
        </div>

        <div className="bg-black p-6 rounded-lg border-2 border-orange-500">
          <div className="grid grid-cols-6 md:grid-cols-8 gap-3">
            {lotesActuales.map(lote => (
              <div key={lote.id} className="relative">
                <button
                  onClick={() => handleLoteClick(lote)}
                  onContextMenu={(e) => { e.preventDefault(); setEditandoLote(lote); }}
                  className={`w-full aspect-square rounded-lg border-3 transition-all hover:scale-110 flex flex-col items-center justify-center text-xs font-bold shadow-lg ${
                    selectedLote?.id === lote.id
                      ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white border-orange-300 scale-110'
                      : lote.estatus === 'disponible'
                      ? 'bg-gradient-to-br from-orange-500 to-orange-700 text-white border-orange-300 cursor-pointer'
                      : 'bg-gradient-to-br from-red-700 to-red-900 text-white border-red-500 opacity-50'
                  }`}
                >
                  <span className="text-lg">{lote.numero}</span>
                  <span className="text-xs">{lote.superficie}m²</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {editandoLote && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 max-w-md w-full border-4 border-orange-500">
              <h3 className="text-xl font-bold text-orange-400 mb-4">Editar Lote {editandoLote.numero}</h3>
              <div className="space-y-3">
                <select 
                  value={editandoLote.estatus}
                  onChange={(e) => setEditandoLote({...editandoLote, estatus: e.target.value})}
                  className="w-full p-3 bg-black border-2 border-orange-500 rounded text-white"
                >
                  <option value="disponible">Disponible</option>
                  <option value="vendido">Vendido</option>
                  <option value="apartado">Apartado</option>
                </select>
                <input 
                  type="number"
                  value={editandoLote.precio}
                  onChange={(e) => setEditandoLote({...editandoLote, precio: Number(e.target.value)})}
                  className="w-full p-3 bg-black border-2 border-orange-500 rounded text-white"
                  placeholder="Precio"
                />
                <textarea 
                  value={editandoLote.notas}
                  onChange={(e) => setEditandoLote({...editandoLote, notas: e.target.value})}
                  className="w-full p-3 bg-black border-2 border-orange-500 rounded text-white"
                  placeholder="Notas..."
                  rows="3"
                />
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={() => actualizarLote(editandoLote.id, editandoLote)} className="flex-1 bg-orange-600 text-white px-4 py-2 rounded font-bold">Guardar</button>
                <button onClick={() => eliminarLote(editandoLote.id)} className="bg-red-600 text-white px-4 py-2 rounded font-bold">Eliminar</button>
                <button onClick={() => setEditandoLote(null)} className="bg-gray-700 text-white px-4 py-2 rounded font-bold">Cancelar</button>
              </div>
            </div>
          </div>
        )}

        {selectedLote && (
          <div className="mt-6 bg-gradient-to-r from-orange-600 to-orange-800 rounded-lg p-6 border-2 border-orange-400">
            <h3 className="font-bold text-2xl text-white mb-4">🏠 Lote Seleccionado: {selectedLote.numero}</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-black bg-opacity-50 p-4 rounded-lg border border-orange-300">
                <p className="text-orange-300 text-sm">Superficie</p>
                <p className="text-2xl font-bold text-white">{selectedLote.superficie} m²</p>
              </div>
              <div className="bg-black bg-opacity-50 p-4 rounded-lg border border-orange-300">
                <p className="text-orange-300 text-sm">Precio Total</p>
                <p className="text-2xl font-bold text-white">${selectedLote.precio.toLocaleString()}</p>
              </div>
              <div className="bg-black bg-opacity-50 p-4 rounded-lg border border-orange-300">
                <p className="text-orange-300 text-sm">Enganche</p>
                <p className="text-2xl font-bold text-white">${proyectoInfo.enganche.toLocaleString()}</p>
              </div>
              <div className="bg-black bg-opacity-50 p-4 rounded-lg border border-orange-300">
                <p className="text-orange-300 text-sm">Mensualidad</p>
                <p className="text-2xl font-bold text-white">${proyectoInfo.mensualidad.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg p-4 border-2 border-yellow-400">
              <h4 className="font-bold text-white mb-3 text-xl">💰 TU COMISIÓN POR ENGANCHE</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black bg-opacity-50 p-4 rounded-lg border-2 border-yellow-300">
                  <p className="text-yellow-200 text-sm font-semibold">Comisión 5%</p>
                  <p className="text-3xl font-bold text-yellow-300">${comision5.toLocaleString()}</p>
                </div>
                <div className="bg-black bg-opacity-50 p-4 rounded-lg border-2 border-yellow-300">
                  <p className="text-yellow-200 text-sm font-semibold">Comisión 10%</p>
                  <p className="text-3xl font-bold text-yellow-300">${comision10.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DisenatuCasa = () => {
  const [selectedLayout, setSelectedLayout] = useState(0);
  const [sunPosition, setSunPosition] = useState(90);
  const [espacios, setEspacios] = useState([]);
  const [zoom, setZoom] = useState(1);
  const [herramientaActiva, setHerramientaActiva] = useState('mover');

  const layouts = [
    {
      nombre: "Casa Compacta 2 Rec",
      espacios: [
        { id: 1, nombre: "Cochera", x: 0, y: 0, w: 50, h: 30, ancho: 5, largo: 6, color: "from-gray-600 to-gray-800" },
        { id: 2, nombre: "Sala-Comedor", x: 0, y: 32, w: 50, h: 35, ancho: 5, largo: 7, color: "from-blue-600 to-blue-800" },
        { id: 3, nombre: "Cocina", x: 52, y: 0, w: 48, h: 30, ancho: 4.8, largo: 6, color: "from-yellow-600 to-yellow-800" },
        { id: 4, nombre: "Recámara 1", x: 52, y: 32, w: 48, h: 35, ancho: 4.8, largo: 7, color: "from-purple-600 to-purple-800" },
        { id: 5, nombre: "Recámara 2", x: 0, y: 69, w: 50, h: 31, ancho: 5, largo: 6.2, color: "from-pink-600 to-pink-800" },
        { id: 6, nombre: "Baño", x: 52, y: 69, w: 48, h: 31, ancho: 4.8, largo: 6.2, color: "from-cyan-600 to-cyan-800" }
      ]
    },
    {
      nombre: "Casa 3 Rec Premium",
      espacios: [
        { id: 1, nombre: "Cochera Doble", x: 0, y: 0, w: 60, h: 25, ancho: 6, largo: 5, color: "from-gray-600 to-gray-800" },
        { id: 2, nombre: "Sala", x: 0, y: 27, w: 50, h: 25, ancho: 5, largo: 5, color: "from-blue-600 to-blue-800" },
        { id: 3, nombre: "Comedor", x: 52, y: 27, w: 48, h: 25, ancho: 4.8, largo: 5, color: "from-orange-600 to-orange-800" },
        { id: 4, nombre: "Cocina", x: 62, y: 0, w: 38, h: 25, ancho: 3.8, largo: 5, color: "from-yellow-600 to-yellow-800" },
        { id: 5, nombre: "Rec. Principal", x: 0, y: 54, w: 50, h: 23, ancho: 5, largo: 4.6, color: "from-purple-600 to-purple-800" },
        { id: 6, nombre: "Recámara 2", x: 52, y: 54, w: 48, h: 23, ancho: 4.8, largo: 4.6, color: "from-pink-600 to-pink-800" },
        { id: 7, nombre: "Recámara 3", x: 0, y: 79, w: 50, h: 21, ancho: 5, largo: 4.2, color: "from-red-600 to-red-800" },
        { id: 8, nombre: "Baños", x: 52, y: 79, w: 48, h: 21, ancho: 4.8, largo: 4.2, color: "from-cyan-600 to-cyan-800" }
      ]
    }
  ];

  useEffect(() => {
    setEspacios(layouts[selectedLayout].espacios);
  }, [selectedLayout]);

  const agregarEspacio = () => {
    const nuevoEspacio = {
      id: Date.now(),
      nombre: "Nuevo Espacio",
      x: 10,
      y: 10,
      w: 30,
      h: 20,
      ancho: 3,
      largo: 4,
      color: "from-gray-600 to-gray-800"
    };
    setEspacios([...espacios, nuevoEspacio]);
  };

  const duplicarEspacio = (espacio) => {
    const duplicado = {...espacio, id: Date.now(), x: espacio.x + 5, y: espacio.y + 5};
    setEspacios([...espacios, duplicado]);
  };

  const eliminarEspacio = (id) => {
    setEspacios(espacios.filter(e => e.id !== id));
  };

  const sunX = 50 + Math.cos((sunPosition - 90) * Math.PI / 180) * 45;
  const sunY = 50 + Math.sin((sunPosition - 90) * Math.PI / 180) * 45;

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-2xl p-6 border-2 border-orange-500">
        <h2 className="text-2xl font-bold mb-4 text-orange-400">🏗️ Diseña tu Casa - 200m² (10m x 20m)</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <select 
            value={selectedLayout}
            onChange={(e) => setSelectedLayout(Number(e.target.value))}
            className="p-3 bg-black border-2 border-orange-500 rounded-lg text-orange-400 font-bold"
          >
            {layouts.map((layout, idx) => (
              <option key={idx} value={idx}>{layout.nombre}</option>
            ))}
          </select>

          <div className="flex gap-2">
            <button onClick={() => setHerramientaActiva('mover')} className={`flex-1 px-3 py-2 rounded font-bold flex items-center justify-center gap-2 ${herramientaActiva === 'mover' ? 'bg-orange-600 text-white' : 'bg-gray-800 text-gray-300'}`}>
              <Move className="w-4 h-4" /> Mover
            </button>
            <button onClick={agregarEspacio} className="bg-green-600 text-white px-3 py-2 rounded font-bold flex items-center gap-2">
              <Plus className="w-4 h-4" /> Espacio
            </button>
            <button onClick={() => setZoom(zoom + 0.1)} className="bg-gray-800 text-white px-3 py-2 rounded"><ZoomIn className="w-4 h-4" /></button>
            <button onClick={() => setZoom(Math.max(0.5, zoom - 0.1))} className="bg-gray-800 text-white px-3 py-2 rounded"><ZoomOut className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="mb-6 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg p-4 border-2 border-yellow-400">
          <div className="flex items-center gap-3 mb-3">
            <Sun className="w-8 h-8 text-yellow-300" />
            <label className="font-bold text-white text-lg">☀️ Orientación del Sol</label>
          </div>
          <input 
            type="range" 
            min="0" 
            max="360" 
            value={sunPosition}
            onChange={(e) => setSunPosition(Number(e.target.value))}
            className="w-full h-3 bg-black rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #f97316 0%, #ea580c ${sunPosition/3.6}%, #000 ${sunPosition/3.6}%, #000 100%)`
            }}
          />
          <p className="text-white font-semibold mt-2 text-center">
            {sunPosition}° - {
              sunPosition < 45 || sunPosition > 315 ? '🧭 Norte' :
              sunPosition < 135 ? '🌅 Este (Sol Matutino)' :
              sunPosition < 225 ? '☀️ Sur' :
              '🌇 Oeste (Sol Vespertino)'
            }
          </p>
        </div>

        <div className="relative bg-gradient-to-br from-gray-800 to-black rounded-xl p-6 border-2 border-orange-500 overflow-auto" style={{ minHeight: '700px' }}>
          <div 
            className="absolute w-20 h-20 bg-gradient-radial from-yellow-400 via-orange-400 to-transparent rounded-full flex items-center justify-center shadow-2xl transition-all duration-300"
            style={{
              left: `${sunX}%`,
              top: `${sunY}%`,
              transform: 'translate(-50%, -50%)',
              opacity: 0.5,
              boxShadow: '0 0 60px rgba(251, 191, 36, 0.6)'
            }}
          >
            <Sun className="w-12 h-12 text-yellow-200" />
          </div>

          <div className="relative mx-auto bg-white rounded-lg shadow-2xl" style={{ width: `${500 * zoom}px`, height: `${1000 * zoom}px`, transform: `scale(${zoom})`, transformOrigin: 'top center' }}>
            <div className="absolute -top-8 left-0 right-0 text-center text-sm font-bold text-orange-400 bg-black px-4 py-1 rounded-t-lg border-2 border-orange-500">
              10 metros (Frente)
            </div>
            <div className="absolute -left-16 top-0 bottom-0 flex items-center">
              <div className="transform -rotate-90 text-sm font-bold text-orange-400 whitespace-nowrap bg-black px-4 py-1 rounded-lg border-2 border-orange-500">
                20 metros (Fondo)
              </div>
            </div>

            <div className="absolute inset-0 p-2">
              {espacios.map((espacio) => (
                <div
                  key={espacio.id}
                  className={`absolute bg-gradient-to-br ${espacio.color} border-2 border-white rounded-lg flex flex-col items-center justify-center text-xs font-bold shadow-lg cursor-move hover:scale-105 transition-transform p-2 group`}
                  style={{
                    left: `${espacio.x}%`,
                    top: `${espacio.y}%`,
                    width: `${espacio.w}%`,
                    height: `${espacio.h}%`
                  }}
                  draggable
                  onDragEnd={(e) => {
                    const rect = e.currentTarget.parentElement.getBoundingClientRect();
                    const newX = ((e.clientX - rect.left) / rect.width) * 100;
                    const newY = ((e.clientY - rect.top) / rect.height) * 100;
                    setEspacios(espacios.map(esp => 
                      esp.id === espacio.id ? {...esp, x: Math.max(0, Math.min(90, newX)), y: Math.max(0, Math.min(90, newY))} : esp
                    ));
                  }}
                >
                  <span className="text-white text-center drop-shadow-lg">{espacio.nombre}</span>
                  <span className="text-yellow-300 font-extrabold mt-1 drop-shadow-lg">{espacio.ancho}m × {espacio.largo}m</span>
                  <span className="text-gray-200 text-xs mt-1">{(espacio.ancho * espacio.largo).toFixed(1)}m²</span>
                  
                  <div className="absolute top-1 right-1 hidden group-hover:flex gap-1">
                    <button onClick={() => duplicarEspacio(espacio)} className="bg-green-600 text-white p-1 rounded">
                      <Copy className="w-3 h-3" />
                    </button>
                    <button onClick={() => eliminarEspacio(espacio.id)} className="bg-red-600 text-white p-1 rounded">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 bg-gradient-to-r from-orange-600 to-orange-800 rounded-lg p-6 border-4 border-orange-400 shadow-2xl">
          <h3 className="font-bold text-2xl mb-4 text-white">💡 CONSEJOS PROFESIONALES</h3>
          <ul className="text-white space-y-3 text-sm">
            <li className="flex items-start gap-3 bg-black bg-opacity-40 p-3 rounded-lg">
              <span className="text-2xl">🌡️</span>
              <span>Ubica las recámaras en el lado opuesto al sol de la tarde (oeste) para mantener temperaturas más frescas</span>
            </li>
            <li className="flex items-start gap-3 bg-black bg-opacity-40 p-3 rounded-lg">
              <span className="text-2xl">💨</span>
              <span>La cocina DEBE tener ventilación cruzada por el calor extremo de Mexicali (50°C en verano)</span>
            </li>
            <li className="flex items-start gap-3 bg-black bg-opacity-40 p-3 rounded-lg">
              <span className="text-2xl">🌳</span>
              <span>Planta árboles de sombra (mezquite, palo verde) en el patio para reducir temperatura hasta 10°C</span>
            </li>
            <li className="flex items-start gap-3 bg-black bg-opacity-40 p-3 rounded-lg">
              <span className="text-2xl">✈️</span>
              <span>Por cercanía al aeropuerto, considera aislamiento acústico en ventanas y techos</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const GuiaMateriales = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const materiales = [
    {
      categoria: "🧱 Muros",
      items: [
        { nombre: "Block Térmico", emoji: "🧱", desc: "Aislamiento contra calor extremo", precio: "$45/m²", ventaja: "Reduce temperatura interior hasta 8°C" },
        { nombre: "Concreto Reforzado", emoji: "🏗️", desc: "Resistencia sísmica zona activa", precio: "$180/m³", ventaja: "Protección ante sismos frecuentes" }
      ]
    },
    {
      categoria: "🏠 Techos",
      items: [
        { nombre: "Losa + Poliestireno", emoji: "🔲", desc: "Aislamiento térmico superior", precio: "$650/m²", ventaja: "Ahorro 40% en aire acondicionado" },
        { nombre: "Recubrimiento Reflectivo", emoji: "✨", desc: "Repele calor radiante", precio: "$85/m²", ventaja: "Refleja 90% radiación solar" }
      ]
    },
    {
      categoria: "🪟 Ventanas",
      items: [
        { nombre: "Vidrio Doble Low-E", emoji: "🪟", desc: "Bloquea calor infrarrojo", precio: "$1,200/m²", ventaja: "Reduce calor 70% + ruido aeropuerto" },
        { nombre: "Marco PVC Térmico", emoji: "🔳", desc: "No conduce calor", precio: "$450/m²", ventaja: "Sin mantenimiento + durabilidad" }
      ]
    },
    {
      categoria: "🔇 Aislamiento Acústico",
      items: [
        { nombre: "Fibra de Vidrio", emoji: "🧵", desc: "Absorbe ruido de aviones", precio: "$120/m²", ventaja: "Reduce ruido hasta 40 dB" },
        { nombre: "Doble Vidrio Laminado", emoji: "🔲", desc: "Máxima reducción de ruido", precio: "$1,400/m²", ventaja: "Esencial cerca del aeropuerto" }
      ]
    },
    {
      categoria: "🌳 Jardinería",
      items: [
        { nombre: "Plantas Xerófitas", emoji: "🌵", desc: "Bajo consumo de agua", precio: "$150/set", ventaja: "Adaptadas a clima desértico" },
        { nombre: "Árboles de Sombra", emoji: "🌳", desc: "Mezquite, Palo Verde", precio: "$450/árbol", ventaja: "Reducen temperatura 10°C" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-2xl p-6 border-2 border-orange-500">
        <h2 className="text-3xl font-bold mb-4 text-orange-400">🏗️ Guía de Materiales Mexicali</h2>
        <div className="mb-6 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg p-4 border-2 border-red-400">
          <p className="text-white font-bold text-lg">⚠️ CONDICIONES EXTREMAS: Calor 50°C + Cercanía Aeropuerto Internacional</p>
        </div>

        {materiales.map((cat, idx) => (
          <div key={idx} className="mb-8">
            <h3 className="text-2xl font-bold mb-4 text-orange-400 border-b-4 border-orange-500 pb-2">{cat.categoria}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cat.items.map((item, i) => (
                <div
                  key={i}
                  className="relative bg-gradient-to-br from-gray-800 to-black rounded-xl overflow-hidden border-2 border-orange-500 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:border-orange-400 cursor-pointer"
                  onMouseEnter={() => setHoveredItem(`${idx}-${i}`)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="relative h-64 flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900">
                    <div className="text-9xl">{item.emoji}</div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-xl text-orange-400 mb-2">{item.nombre}</h4>
                    <p className="text-gray-300 text-sm mb-3">{item.desc}</p>
                    
                    {hoveredItem === `${idx}-${i}` && (
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-black bg-opacity-95 p-6 flex flex-col justify-center items-center text-center animate-fadeIn border-4 border-orange-400">
                        <h4 className="font-bold text-2xl text-white mb-4">{item.nombre}</h4>
                        <p className="text-white text-lg mb-4">{item.ventaja}</p>
                        <div className="bg-black bg-opacity-70 px-6 py-3 rounded-lg border-2 border-orange-400">
                          <p className="text-orange-300 text-sm font-semibold">Precio Actual</p>
                          <p className="text-3xl font-bold text-orange-400">{item.precio}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CRMClientes = ({ clientes, setClientes, clientesSelectos, setClientesSelectos }) => {
  const [mostrarForm, setMostrarForm] = useState(false);
  const [filtro, setFiltro] = useState('todos');
  const [clienteEditando, setClienteEditando] = useState(null);

  const quotes = [
    "\"El mejor momento para comprar fue ayer. El segundo mejor momento es HOY.\"",
    "\"No vendas terreno, vende el FUTURO de una familia.\"",
    "\"Cada 'NO' te acerca más al próximo 'SÍ'.\"",
    "\"La urgencia es tu aliada: 'Solo quedan 12 lotes disponibles'.\"",
    "\"Escucha más de lo que hablas. El cliente te dirá cómo venderle.\""
  ];

  const [currentQuote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);

  const agregarCliente = (cliente) => {
    if (clienteEditando) {
      setClientes(clientes.map(c => c.id === clienteEditando.id ? {...cliente, id: clienteEditando.id} : c));
      setClienteEditando(null);
    } else {
      setClientes([...clientes, { ...cliente, id: Date.now(), fecha: new Date().toLocaleDateString() }]);
    }
    setMostrarForm(false);
  };

  const eliminarCliente = (id) => {
    if (confirm('¿Eliminar este cliente?')) {
      setClientes(clientes.filter(c => c.id !== id));
    }
  };

  const agendarGoogle = (cliente) => {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + 2);
    const fechaStr = fecha.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Seguimiento: ${cliente.nombre}&dates=${fechaStr}/${fechaStr}&details=Cliente: ${cliente.nombre}%0ACelular: ${cliente.celular}%0ALote: ${cliente.lote}&location=Terrenos Islas Agrarias`;
    window.open(url, '_blank');
  };

  const exportarClientes = (formato) => {
    if (formato === 'pdf') {
      window.print();
    } else {
      const data = JSON.stringify(clientes, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `clientes_${new Date().toLocaleDateString()}.json`;
      a.click();
    }
  };

  const getInteresEmoji = (interes) => {
    if (interes >= 80) return '🔥';
    if (interes >= 60) return '😃';
    if (interes >= 40) return '😐';
    if (interes >= 20) return '😕';
    return '😞';
  };

  const clientesFiltrados = clientes.filter(c => filtro === 'todos' || c.estatus === filtro);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-2xl p-6 border-2 border-orange-500">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <h2 className="text-2xl font-bold text-orange-400">📊 CRM - Gestión de Prospectos</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => { setMostrarForm(!mostrarForm); setClienteEditando(null); }}
              className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-4 py-2 rounded-lg hover:from-orange-500 hover:to-orange-600 flex items-center gap-2 font-bold shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Nuevo
            </button>
            <button 
              onClick={() => exportarClientes('pdf')}
              className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-4 py-2 rounded-lg hover:from-gray-600 hover:to-gray-700 flex items-center gap-2 font-bold"
            >
              <Download className="w-5 h-5" />
              Exportar
            </button>
          </div>
        </div>

        <div className="mb-4 flex gap-2 flex-wrap">
          {['todos', 'prospecto', 'seguimiento', 'interesado'].map(f => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                filtro === f 
                  ? 'bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-lg' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-orange-500'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {mostrarForm && (
          <FormularioCliente onSave={agregarCliente} onCancel={() => { setMostrarForm(false); setClienteEditando(null); }} clienteInicial={clienteEditando} />
        )}

        <div className="space-y-4">
          {clientesFiltrados.length === 0 ? (
            <p className="text-center text-gray-400 py-8">No hay prospectos registrados</p>
          ) : (
            clientesFiltrados.map(cliente => (
              <div key={cliente.id} className="bg-gradient-to-br from-gray-800 to-black rounded-lg p-4 border-l-4 border-orange-500 shadow-lg hover:shadow-2xl transition-all">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-xl text-orange-400">{cliente.nombre}</h3>
                      <span className="text-3xl">{getInteresEmoji(cliente.interes)}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-300">
                      <p>📱 {cliente.celular}</p>
                      <p>📧 {cliente.email}</p>
                      <p>📅 {cliente.fecha}</p>
                      <p>🏠 Lote: {cliente.lote || 'Sin asignar'}</p>
                      <p>💎 Interés: {cliente.interes}%</p>
                    </div>
                    {cliente.comentarios && (
                      <p className="mt-2 text-sm text-gray-300 bg-black bg-opacity-50 p-2 rounded border border-orange-500">{cliente.comentarios}</p>
                    )}
                    <div className="mt-3 flex gap-2 flex-wrap">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        cliente.estatus === 'prospecto' ? 'bg-blue-600 text-white' :
                        cliente.estatus === 'seguimiento' ? 'bg-yellow-600 text-white' :
                        'bg-green-600 text-white'
                      }`}>
                        {cliente.estatus}
                      </span>
                      <button onClick={() => agendarGoogle(cliente)} className="bg-orange-600 text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-orange-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> Agendar
                      </button>
                      <button onClick={() => { setClienteEditando(cliente); setMostrarForm(true); }} className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-blue-500 flex items-center gap-1">
                        <Edit className="w-3 h-3" /> Editar
                      </button>
                      <button onClick={() => eliminarCliente(cliente.id)} className="bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-red-500 flex items-center gap-1">
                        <Trash2 className="w-3 h-3" /> Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 bg-gradient-to-r from-orange-600 via-orange-700 to-black rounded-lg p-6 border-4 border-orange-400 shadow-2xl">
          <h3 className="text-3xl font-bold text-white mb-3 text-center">💪 FRASE DEL DÍA</h3>
          <p className="text-2xl text-white font-bold text-center italic">{currentQuote}</p>
        </div>
      </div>
    </div>
  );
};

const FormularioCliente = ({ onSave, onCancel, clienteInicial }) => {
  const [form, setForm] = useState(clienteInicial || {
    nombre: '', celular: '', email: '', lote: '', estatus: 'prospecto', 
    interes: 50, comentarios: ''
  });

  return (
    <div className="bg-gradient-to-br from-orange-900 to-black rounded-lg p-6 mb-6 border-2 border-orange-500 shadow-2xl">
      <h3 className="font-bold mb-4 text-xl text-orange-400">{clienteInicial ? 'Editar' : 'Nuevo'} Prospecto</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input 
          type="text" 
          placeholder="Nombre completo"
          value={form.nombre}
          onChange={e => setForm({...form, nombre: e.target.value})}
          className="p-3 border-2 border-orange-500 rounded-lg bg-black text-white"
        />
        <input 
          type="tel" 
          placeholder="Celular"
          value={form.celular}
          onChange={e => setForm({...form, celular: e.target.value})}
          className="p-3 border-2 border-orange-500 rounded-lg bg-black text-white"
        />
        <input 
          type="email" 
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({...form, email: e.target.value})}
          className="p-3 border-2 border-orange-500 rounded-lg bg-black text-white"
        />
        <input 
          type="text" 
          placeholder="Lote (ej: A-15)"
          value={form.lote}
          onChange={e => setForm({...form, lote: e.target.value})}
          className="p-3 border-2 border-orange-500 rounded-lg bg-black text-white"
        />
        <select 
          value={form.estatus}
          onChange={e => setForm({...form, estatus: e.target.value})}
          className="p-3 border-2 border-orange-500 rounded-lg bg-black text-white"
        >
          <option value="prospecto">Prospecto</option>
          <option value="seguimiento">Seguimiento</option>
          <option value="interesado">Interesado</option>
        </select>
      </div>
      <div className="mt-4">
        <label className="text-white font-semibold flex items-center gap-2">
          Nivel de Interés: {form.interes}% 
          <span className="text-3xl">
            {form.interes >= 80 ? '🔥' : form.interes >= 60 ? '😃' : form.interes >= 40 ? '😐' : form.interes >= 20 ? '😕' : '😞'}
          </span>
        </label>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={form.interes}
          onChange={e => setForm({...form, interes: Number(e.target.value)})}
          className="w-full h-3 bg-black rounded-lg"
        />
      </div>
      <textarea 
        placeholder="Comentarios..."
        value={form.comentarios}
        onChange={e => setForm({...form, comentarios: e.target.value})}
        className="w-full mt-3 p-3 border-2 border-orange-500 rounded-lg bg-black text-white"
        rows="3"
      />
      <div className="flex gap-3 mt-4">
        <button 
          onClick={() => onSave(form)}
          className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 text-white px-4 py-3 rounded-lg font-bold hover:from-orange-500 hover:to-orange-600"
        >
          Guardar
        </button>
        <button 
          onClick={onCancel}
          className="flex-1 bg-gray-700 text-white px-4 py-3 rounded-lg font-bold hover:bg-gray-600"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

const ClientesSelectos = ({ clientesSelectos, setClientesSelectos, proyectoInfo }) => {
  const calcularDesglose = (cliente) => {
    const saldo = proyectoInfo.precioTotal - proyectoInfo.enganche;
    const mensualidad = proyectoInfo.mensualidad;
    const plazo = proyectoInfo.plazo;
    const comision5 = proyectoInfo.enganche * 0.05;
    const comision10 = proyectoInfo.enganche * 0.10;
    
    return { saldo, mensualidad, plazo, comision5, comision10 };
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-2xl p-6 border-2 border-orange-500">
        <h2 className="text-3xl font-bold mb-6 text-orange-400">⭐ CLIENTES SELECTOS - Enganche Pagado</h2>
        
        {clientesSelectos.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <CheckCircle className="w-24 h-24 mx-auto mb-4 text-orange-500 opacity-30" />
            <p className="text-xl">No hay clientes selectos aún</p>
            <p className="text-sm mt-2">Cuando un prospecto pague su enganche, aparecerá aquí</p>
          </div>
        ) : (
          <div className="space-y-6">
            {clientesSelectos.map(cliente => {
              const desglose = calcularDesglose(cliente);
              return (
                <div key={cliente.id} className="bg-gradient-to-br from-orange-900 to-black rounded-xl p-6 border-4 border-orange-500 shadow-2xl">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-2xl text-orange-400">{cliente.nombre}</h3>
                      <p className="text-gray-300">📱 {cliente.celular}</p>
                      <p className="text-gray-300">🏠 Lote: {cliente.lote}</p>
                    </div>
                    <div className="bg-green-600 px-4 py-2 rounded-lg">
                      <p className="text-white font-bold">✅ ENGANCHE PAGADO</p>
                    </div>
                  </div>

                  <div className="bg-black bg-opacity-50 rounded-lg p-4 border-2 border-orange-400">
                    <h4 className="font-bold text-orange-400 mb-3 text-lg">💰 DESGLOSE FINANCIERO</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <div className="bg-gray-900 p-3 rounded border border-orange-500">
                        <p className="text-gray-400 text-xs">Precio Total</p>
                        <p className="text-white font-bold text-lg">${proyectoInfo.precioTotal.toLocaleString()}</p>
                      </div>
                      <div className="bg-gray-900 p-3 rounded border border-orange-500">
                        <p className="text-gray-400 text-xs">Enganche Pagado</p>
                        <p className="text-green-400 font-bold text-lg">${proyectoInfo.enganche.toLocaleString()}</p>
                      </div>
                      <div className="bg-gray-900 p-3 rounded border border-orange-500">
                        <p className="text-gray-400 text-xs">Saldo Restante</p>
                        <p className="text-orange-400 font-bold text-lg">${desglose.saldo.toLocaleString()}</p>
                      </div>
                      <div className="bg-gray-900 p-3 rounded border border-orange-500">
                        <p className="text-gray-400 text-xs">Mensualidad</p>
                        <p className="text-white font-bold text-lg">${desglose.mensualidad.toLocaleString()}</p>
                      </div>
                      <div className="bg-gray-900 p-3 rounded border border-orange-500">
                        <p className="text-gray-400 text-xs">Plazo</p>
                        <p className="text-white font-bold text-lg">{desglose.plazo} meses</p>
                      </div>
                      <div className="bg-gray-900 p-3 rounded border border-orange-500">
                        <p className="text-gray-400 text-xs">Total a Pagar</p>
                        <p className="text-white font-bold text-lg">${proyectoInfo.precioTotal.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="mt-4 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg p-4 border-2 border-yellow-400">
                      <h5 className="font-bold text-white mb-2">💵 TU COMISIÓN GANADA</h5>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-black bg-opacity-50 p-3 rounded">
                          <p className="text-yellow-200 text-xs">Comisión 5%</p>
                          <p className="text-2xl font-bold text-yellow-300">${desglose.comision5.toLocaleString()}</p>
                        </div>
                        <div className="bg-black bg-opacity-50 p-3 rounded">
                          <p className="text-yellow-200 text-xs">Comisión 10%</p>
                          <p className="text-2xl font-bold text-yellow-300">${desglose.comision10.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <a
                      href={`https://wa.me/52${cliente.celular}?text=Hola ${cliente.nombre}, confirmo recepción de tu enganche. ¡Felicidades por tu nuevo lote!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-center hover:bg-green-500"
                    >
                      💬 WhatsApp
                    </a>
                    <a
                      href={`tel:${cliente.celular}`}
                      className="flex-1 bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-center hover:bg-orange-500"
                    >
                      📞 Llamar
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const Calculadora = ({ proyectoInfo }) => {
  const [enganche, setEnganche] = useState(proyectoInfo.enganche);
  const [plazo, setPlazo] = useState(96);
  const [comisionPersonalizada, setComisionPersonalizada] = useState(5);

  const saldoFinanciar = proyectoInfo.precioTotal - enganche;
  const mensualidad = saldoFinanciar / plazo;
  const comision = enganche * (comisionPersonalizada / 100);

  const exportarCalculo = (formato) => {
    const data = `
CALCULADORA DE FINANCIAMIENTO
=============================
Precio Total: $${proyectoInfo.precioTotal.toLocaleString()}
Enganche: $${enganche.toLocaleString()}
Saldo a Financiar: $${saldoFinanciar.toLocaleString()}
Plazo: ${plazo} meses
Mensualidad: $${Math.round(mensualidad).toLocaleString()}

TU COMISIÓN (${comisionPersonalizada}%): $${comision.toLocaleString()}

Sin intereses • Sin aval • Sin buró
    `;

    if (formato === 'pdf') {
      const printWindow = window.open('', '', 'width=800,height=600');
      printWindow.document.write(`<pre>${data}</pre>`);
      printWindow.document.close();
      printWindow.print();
    } else {
      const blob = new Blob([data], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `calculo_${new Date().toLocaleDateString()}.txt`;
      a.click();
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-2xl p-6 border-2 border-orange-500">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-orange-400">🧮 Calculadora de Pagos</h2>
          <button 
            onClick={() => exportarCalculo('txt')}
            className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-4 py-2 rounded-lg font-bold hover:from-orange-500 hover:to-orange-600 flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Exportar
          </button>
        </div>
        
        <div className="space-y-6">
          <div className="bg-black bg-opacity-50 rounded-lg p-4 border-2 border-orange-500">
            <label className="block text-white font-bold mb-3">Enganche: ${enganche.toLocaleString()}</label>
            <input 
              type="range" 
              min="24000" 
              max="200000" 
              step="1000"
              value={enganche}
              onChange={e => setEnganche(Number(e.target.value))}
              className="w-full h-4 bg-black rounded-lg"
            />
          </div>

          <div className="bg-black bg-opacity-50 rounded-lg p-4 border-2 border-orange-500">
            <label className="block text-white font-bold mb-3">Plazo: {plazo} meses ({(plazo/12).toFixed(1)} años)</label>
            <input 
              type="range" 
              min="12" 
              max="123" 
              step="12"
              value={plazo}
              onChange={e => setPlazo(Number(e.target.value))}
              className="w-full h-4 bg-black rounded-lg"
            />
          </div>

          <div className="bg-black bg-opacity-50 rounded-lg p-4 border-2 border-orange-500">
            <label className="block text-white font-bold mb-3">Comisión Personalizada: {comisionPersonalizada}%</label>
            <input 
              type="range" 
              min="1" 
              max="20" 
              step="0.2"
              value={comisionPersonalizada}
              onChange={e => setComisionPersonalizada(Number(e.target.value))}
              className="w-full h-4 bg-black rounded-lg"
            />
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-br from-orange-600 to-orange-800 rounded-xl p-6 border-4 border-orange-400 shadow-2xl">
          <h3 className="text-2xl font-bold mb-6 text-white">💰 RESULTADO DEL CÁLCULO</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black bg-opacity-50 p-4 rounded-lg border-2 border-orange-300">
              <p className="text-orange-300 text-sm">Precio Total</p>
              <p className="text-2xl font-bold text-white">${proyectoInfo.precioTotal.toLocaleString()}</p>
            </div>
            <div className="bg-black bg-opacity-50 p-4 rounded-lg border-2 border-orange-300">
              <p className="text-orange-300 text-sm">Enganche</p>
              <p className="text-2xl font-bold text-white">${enganche.toLocaleString()}</p>
            </div>
            <div className="bg-black bg-opacity-50 p-4 rounded-lg border-2 border-orange-300">
              <p className="text-orange-300 text-sm">Saldo a Financiar</p>
              <p className="text-2xl font-bold text-white">${saldoFinanciar.toLocaleString()}</p>
            </div>
            <div className="bg-black bg-opacity-50 p-4 rounded-lg border-2 border-orange-300">
              <p className="text-orange-300 text-sm">Mensualidad</p>
              <p className="text-3xl font-bold text-orange-400">${Math.round(mensualidad).toLocaleString()}</p>
            </div>
          </div>
          <p className="text-white text-center mt-4 text-sm">✅ Sin intereses • Sin aval • Sin buró</p>
        </div>

        <div className="mt-6 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl p-6 border-4 border-yellow-400 shadow-2xl">
          <h4 className="font-bold text-white mb-4 text-2xl">💵 TU COMISIÓN ({comisionPersonalizada}%)</h4>
          <div className="bg-black bg-opacity-50 p-6 rounded-lg border-2 border-yellow-300 text-center">
            <p className="text-yellow-200 text-sm font-semibold mb-2">Comisión Total</p>
            <p className="text-5xl font-bold text-yellow-300">${comision.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Contacto = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-2xl p-6 border-2 border-orange-500">
        <h2 className="text-2xl font-bold mb-6 text-orange-400">📞 Información de Contacto</h2>
        
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-orange-900 to-black p-6 rounded-lg border-2 border-orange-500">
            <h3 className="font-bold mb-4 text-xl text-orange-400 flex items-center gap-2">
              <Phone className="w-6 h-6" /> Vía WhatsApp
            </h3>
            <a 
              href="https://wa.me/5216613343894" 
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-green-600 text-white p-4 rounded-lg text-center font-bold text-lg hover:bg-green-500 transition-all"
            >
              💬 +52 661 334 3894
              <p className="text-sm mt-1">Javier Cital</p>
            </a>
            <div className="mt-4 flex items-center gap-2 text-white">
              <Mail className="w-5 h-5 text-orange-400" />
              <a href="mailto:ventas_jcw@outlook.com" className="text-orange-400 hover:text-orange-300">
                ventas_jcw@outlook.com
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-600 to-orange-800 p-6 rounded-lg border-4 border-orange-400 shadow-2xl">
            <h3 className="font-bold mb-4 text-2xl text-white text-center">🎯 ¿NECESITAS UN CRM A TU MEDIDA?</h3>
            <p className="text-white text-center text-lg mb-4">
              Contáctame si quieres un CRM personalizado para cualquier rubro, estilo y necesidades.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
              <div className="bg-black bg-opacity-50 p-4 rounded-lg text-center border-2 border-orange-300">
                <div className="text-4xl mb-2">🏢</div>
                <p className="text-white font-semibold text-sm">Inmobiliarias</p>
              </div>
              <div className="bg-black bg-opacity-50 p-4 rounded-lg text-center border-2 border-orange-300">
                <div className="text-4xl mb-2">🏥</div>
                <p className="text-white font-semibold text-sm">Clínicas</p>
              </div>
              <div className="bg-black bg-opacity-50 p-4 rounded-lg text-center border-2 border-orange-300">
                <div className="text-4xl mb-2">🛒</div>
                <p className="text-white font-semibold text-sm">Comercios</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 p-8 rounded-xl border-4 border-yellow-400 shadow-2xl text-center">
            <h3 className="text-4xl font-black text-white mb-4 drop-shadow-lg">
              🚀 IMPULSA TU NEGOCIO AL SIGUIENTE NIVEL
            </h3>
            <p className="text-white text-xl font-bold mb-6">
              Sistemas profesionales diseñados específicamente para TUS necesidades
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur">
                <p className="text-3xl mb-2">⚡</p>
                <p className="text-white font-semibold text-sm">Rápido</p>
              </div>
              <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur">
                <p className="text-3xl mb-2">💎</p>
                <p className="text-white font-semibold text-sm">Premium</p>
              </div>
              <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur">
                <p className="text-3xl mb-2">📊</p>
                <p className="text-white font-semibold text-sm">Completo</p>
              </div>
              <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur">
                <p className="text-3xl mb-2">🎨</p>
                <p className="text-white font-semibold text-sm">A tu medida</p>
              </div>
            </div>
            <a 
              href="https://wa.me/5216613343894?text=Hola, quiero un CRM personalizado" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-orange-600 px-8 py-4 rounded-full font-black text-xl hover:scale-110 transition-transform shadow-2xl"
            >
              ¡CONTÁCTAME AHORA! 🔥
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModalCaptura = ({ lote, proyectoInfo, onClose, onSave }) => {
  const [datos, setDatos] = useState({ 
    nombre: '', 
    celular: '', 
    email: '',
    lote: lote?.numero || '', 
    estatus: 'prospecto', 
    interes: 50, 
    comentarios: '',
    apartado: false
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 max-w-md w-full border-4 border-orange-500 shadow-2xl max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-orange-400">🎯 Capturar Cliente - {lote?.numero}</h2>
        <div className="space-y-3">
          <input 
            type="text" 
            placeholder="Nombre completo"
            value={datos.nombre}
            onChange={e => setDatos({...datos, nombre: e.target.value})}
            className="w-full p-3 border-2 border-orange-500 rounded-lg bg-black text-white"
          />
          <input 
            type="tel" 
            placeholder="Celular"
            value={datos.celular}
            onChange={e => setDatos({...datos, celular: e.target.value})}
            className="w-full p-3 border-2 border-orange-500 rounded-lg bg-black text-white"
          />
          <input 
            type="email" 
            placeholder="Email"
            value={datos.email}
            onChange={e => setDatos({...datos, email: e.target.value})}
            className="w-full p-3 border-2 border-orange-500 rounded-lg bg-black text-white"
          />
          <textarea 
            placeholder="Comentarios..."
            value={datos.comentarios}
            onChange={e => setDatos({...datos, comentarios: e.target.value})}
            className="w-full p-3 border-2 border-orange-500 rounded-lg bg-black text-white"
            rows="3"
          />
          
          <div className="flex items-center gap-3 bg-orange-900 p-4 rounded-lg border-2 border-orange-500">
            <input 
              type="checkbox"
              id="apartado"
              checked={datos.apartado}
              onChange={e => setDatos({...datos, apartado: e.target.checked})}
              className="w-5 h-5"
            />
            <label htmlFor="apartado" className="text-white font-bold">
              ✅ Cliente pagó ENGANCHE (${proyectoInfo.enganche.toLocaleString()})
            </label>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button 
            onClick={() => onSave(datos)}
            className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 text-white px-4 py-3 rounded-lg font-bold hover:from-orange-500 hover:to-orange-600"
          >
            Guardar
          </button>
          <button 
            onClick={onClose}
            className="flex-1 bg-gray-700 text-white px-4 py-3 rounded-lg font-bold hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TerrenosApp;
