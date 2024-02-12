const express = require("express");

const app = express();
app.use(express.json());

let instruments = [
  { id: 1, name: "Guitarra" },
  { id: 2, name: "Violin" },
  { id: 3, name: "Mandolina" },
];

// Obtener todos los instrumentos
app.get("/instruments/all", (req, res) => {
  res.send(instruments);
});

// Obtener un instrumento por su ID
app.get("/instruments/by_id/:id", (req, res) => {
  const id = req.params.id;
  const instrument = instruments.find((inst) => inst.id == id);
  if (!instrument) {
    res.send({ message: "Instrumento no encontrado" });
  } else {
    res.send(instrument);
  }
});

// Agregar un nuevo instrumento
app.post("/instruments/add", (req, res) => {
  const newInstrument = req.body;
  instruments.push(newInstrument);
  res.send({ message: "Instrumento agregado", instrument: newInstrument });
});

//Modificar un instrumento
app.patch("/instruments/update/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const instrument = instruments.findIndex((inst) => inst.id === id);
  const updateData = req.body;

  if (!instrument) {
    res.send({ message: "Instrumento no encontrado" });
  } else {
    Object.assign(instruments[instrument], updateData);
    res.send({
      message: "Instrumento actualizado",
      instrument: instruments[instrument],
    });
  }
});

// Eliminar un instrumento por su ID
app.delete("/instruments/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const instrument = instruments.findIndex((inst) => inst.id === id);
  if (!instrument) {
    res.send({ message: "Instrumento no encontrado" });
  } else {
    const deletedInstrument = instruments.splice(instrument, 1);
    res.send({
      message: "Instrumento eliminado",
      deletedInstrument: deletedInstrument[0],
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express en ejecución en el puerto ${PORT}`);
});
