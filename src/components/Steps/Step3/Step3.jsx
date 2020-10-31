import React from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import "./Step3.css";

const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
const WEEKDAYS_LONG = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];
const WEEKDAYS_SHORT = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];
const today = new Date();

const Step3 = ({ handleDayClick, day, nextStep }) => {
  
  return (
    <div className="dateContainer">
      <h1>Seleccione una fecha</h1>
      <DayPicker
        locale="es"
        months={MONTHS}
        weekdaysLong={WEEKDAYS_LONG}
        weekdaysShort={WEEKDAYS_SHORT}
        firstDayOfWeek={1}
        onDayClick={handleDayClick}
        selectedDays={day}
        disabledDays={{ before: today }}
        modifiers={{
          sunday: (day) => day.getDay() === 0,
          firstOfMonth: (day) => day.getDate() === 1,
        }}
      />

      {day ? (
        <p>
          Has seleccionado:
          {JSON.stringify(day)}{" "}
        </p>
      ) : (
        <p>Por favor, seleccione una fecha</p>
      )}
      <p></p>
      {day ? (
        <button
          className="step"
          onClick={nextStep}
        >
          Continuar
        </button>
      ) : null}
    </div>
  );
};

export default Step3;
