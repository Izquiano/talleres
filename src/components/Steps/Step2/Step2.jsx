import React, { useEffect } from "react";
import axios from "axios";
import "./Step2.css";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";
// import mapStyles from "./mapStyles";

const libraries = ["places"];
const mapContainerStyle = {
  height: "450px",
  width: "100vw",
};
const options = {
  // styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

let center = null;

navigator.geolocation.getCurrentPosition(function (position) {
  center = { lat: position.coords.latitude, lng: position.coords.longitude };
  return center;
});

const Step2 = ({ nextStep, handleChangeSelected, selected }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAEQa3PYaWe_yOmF1oCTNJyxBr1-7SI9fY", 
    libraries,
  });
  const [markers, setMarkers] = React.useState([]);
  // const [selected, setSelected] = React.useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/workshops`)
      .then((response) => {
        setMarkers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div className="mapaContainer">
      <h1>Selecciona un taller</h1>

      <Locate panTo={panTo} />
      <Search panTo={panTo} />

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        // onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={`${marker.location.lat}-${marker.location.lng}`}
            position={{ lat: marker.location.lat, lng: marker.location.lng }}
            onClick={() => {
              // setSelected(marker);
              handleChangeSelected(marker);
            }}
            icon={{
              url: `icons/ic_Pointer.svg`,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={{
              lat: selected.location.lat,
              lng: selected.location.lng,
            }}
            onCloseClick={() => {
              // setSelected(null);
              handleChangeSelected(null);
            }}
          >
            <div>
              <b className="seleccionar">SELECCIONAR</b>
              <h2>{selected.name}</h2>
              <p>
                Teléfono:{" "}
                <a
                  href={`tel:${selected.telephone}`}
                >{`${selected.telephone}`}</a>
              </p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
      {selected ? (
        <button className="step" onClick={nextStep}>
          Continuar
        </button>
      ) : null}
    </div>
  );
};

export default Step2;

function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img src="icons/ic_Compass.svg" alt="compass" />
    </button>
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Busca tu localización"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ description }, i) => (
                <ComboboxOption key={i} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
