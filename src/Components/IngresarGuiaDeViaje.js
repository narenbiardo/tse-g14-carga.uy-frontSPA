import { useState, useEffect } from "react";
import axios from "axios";
import cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { RESTEndpoints } from "../Services/RestService";
import { IngresarGuiaViajeForm, DtDireccionPostal } from "../classes";
import { ftiigv } from "../constants";
import { FormDiv } from "../Utilities/FormDiv";
import { FormInputNumber } from "../Utilities/FormInputNumber";
import { FormInputDate } from "../Utilities/FormInputDate";
import { FormInputText } from "../Utilities/FormInputText";
import { FormH4 } from "../Utilities/FromH4";
import { FormInputDiv } from "../Utilities/FormInputDiv";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";
import { animateScroll as scroll } from "react-scroll";
import Swal from "sweetalert2";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';



export const IngresarGuiaDeViaje = () => {
	const formRef = useRef(null);
	const [igvf, setIgvf] = useState(new IngresarGuiaViajeForm());
	const [dtddpo, setDtddpo] = useState(new DtDireccionPostal());
	const [dtddpd, setDtddpd] = useState(new DtDireccionPostal());
	const [rubros, setRubros] = useState([]);
	const [firstTimeInput, setfirstTimeInput] = useState(ftiigv);
	const [loading, setLoading] = useState(false);
	const jwtDecoded = jwt_decode(cookies.get("code"));

	const handleChangeIgvf = e => {
		console.log(dtddpd);
		const { name, value } = e.target;
		setIgvf(prevData => ({ ...prevData, [name]: value }));
	};

	const handleChangeDtddpo = e => {
		const { name, value } = e.target;
		var insertName = name;
		insertName = insertName.replace("Origen", "");
		setDtddpo(prevData => ({ ...prevData, [insertName]: value }));
	};

	const handleChangeDtddpd = e => {
		const { name, value } = e.target;
		var insertName = name;
		insertName = insertName.replace("Destino", "");
		setDtddpd(prevData => ({ ...prevData, [insertName]: value }));
	};

	const handlePostGuiaDeViaje = async event => {
		event.preventDefault();
		setLoading(true);
		try {
			const response = await axios.post(
				RESTEndpoints.encargadoService.ingresarGuiaViaje,
				{
					rubro: {
						nombre: igvf.rubro,
					},
					volumenCarga: igvf.volumen,
					fechaHora: igvf.fechaHora,
					origen: {
						calle: igvf.origen.calle,
						nroPuerta: igvf.origen.nroPuerta,
						km: igvf.origen.km,
					},
					destino: {
						calle: igvf.destino.calle,
						nroPuerta: igvf.destino.nroPuerta,
						km: igvf.destino.km,
					},
					estadoViaje: "ASIGNABLE",
					nroEmpresa: jwtDecoded.nroEmpresa,
				}
			);

			setLoading(false);
			Swal.fire({
				title: "Confirmado",
				timer: 2500,
				text: "La guia fue ingresada con éxito!",
				icon: "success",
				confirmButtonText: "Aceptar",
			}).then(() => {
				formRef.current.reset();
				scroll.scrollToTop({
					duration: 200,
					smooth: "easeInOutQuart",
				});
			});
		} catch (error) {
			setLoading(false);
			let errorMessage =
				"Ha ocurrido un error al ingresar la guia, vuelva a intentarlo";

			if (error.response && error.response.data) {
				errorMessage = `${error.response.data}`;
			}

			Swal.fire({
				text: errorMessage,
				title: "Error",
				icon: "error",
				confirmButtonText: "Aceptar",
			});
		}
	};

	const handleRubros = () => {
		axios
			.get(RESTEndpoints.publicService.rubros)
			.then(response => {
				setRubros(response.data);
			})
			.catch(error => {
				console.log(error);
			});
	};

	const handleFirstTimeInput = e => {
		const { name } = e.target;
		setfirstTimeInput(prevData => ({ ...prevData, [name]: false }));
	};

	useEffect(() => {
		setIgvf(prevData => ({
			...prevData,
			["origen"]: dtddpo,
			["destino"]: dtddpd,
		}));
	}, [dtddpo, dtddpd]);

	useEffect(() => {
		handleRubros();
	}, []);

	return (
		<Container className="form-container shadow-dreamy" maxWidth="md">
			<FormDiv referencia={formRef} onSubmit={handlePostGuiaDeViaje}>
				<FormH4 text="Ingresar Guía de Viaje" />

				<FormInputDiv>

					<TextField
						name="rubro"
						form="rubroForm"
						label={igvf.rubro ? "Rubro" : "Seleccionar rubro"}
						variant="outlined" 
						fullWidth 
						value={igvf.rubro}
						select
						onChange={handleChangeIgvf}
						defaultValue=""
						required
						margin="dense"
						size="small"
						color="success"
					>
						{rubros.map((element) => (
							<MenuItem 
								key={Math.random()} 
								value={element.nombre}
							>
								{element.nombre}
							</MenuItem>
						))}

					</TextField>

				</FormInputDiv>

				<FormInputNumber
					htmlFor="volumen"
					label="Volumen"
					name="volumen"
					step="0.01"
					onChangeHandler={handleChangeIgvf}
					isValid={igvf.volumen > 0}
					invalidText={"El volumen no puede ser vacío"}
					firstTime={firstTimeInput.volumen}
					handleFirstTime={handleFirstTimeInput}
				/>

				<FormInputDate
					htmlFor="fechaHora"
					label="Fecha y Hora"
					type="datetime-local"
					name="fechaHora"
					onChangeHandler={handleChangeIgvf}
					isValid={igvf.fechaHora?.length > 0}
					invalidText={"La fecha de la Guía de Viaje no puede ser vacía"}
					firstTime={firstTimeInput.fechaHora}
					handleFirstTime={handleFirstTimeInput}
				/>

				<FormH4 text="Dirección de Origen" />

				<FormInputText
					htmlFor="calleOrigen"
					label="Calle"
					name="calleOrigen"
					required={true}
					onChangeHandler={handleChangeDtddpo}
					isValid={dtddpo.calle?.length > 0}
					invalidText={"La calle del origen no puede ser vacía"}
					firstTime={firstTimeInput.calleOrigen}
					handleFirstTime={handleFirstTimeInput}
				/>

				<FormInputText
					htmlFor="nroPuertaOrigen"
					label="Número de Puerta"
					name="nroPuertaOrigen"
					onChangeHandler={handleChangeDtddpo}
					isValid={true}
					firstTime={firstTimeInput.nroPuertaOrigen}
					handleFirstTime={handleFirstTimeInput}
				/>

				<FormInputText
					htmlFor="kmOrigen"
					label="Kilómetro"
					name="kmOrigen"
					onChangeHandler={handleChangeDtddpo}
					isValid={true}
					firstTime={firstTimeInput.kmOrigen}
					handleFirstTime={handleFirstTimeInput}
				/>

				<FormH4 text="Dirección de Destino" />

				<FormInputText
					htmlFor="calleDestino"
					label="Calle"
					name="calleDestino"
					required={true}
					onChangeHandler={handleChangeDtddpd}
					isValid={dtddpd.calle?.length > 0}
					invalidText={"La calle del destino no puede ser vacía"}
					firstTime={firstTimeInput.calleDestino}
					handleFirstTime={handleFirstTimeInput}
				/>

				<FormInputText
					htmlFor="nroPuertaDestino"
					label="Número de Puerta"
					name="nroPuertaDestino"
					onChangeHandler={handleChangeDtddpd}
					isValid={true}
					firstTime={firstTimeInput.nroPuertaDestino}
					handleFirstTime={handleFirstTimeInput}
				/>

				<FormInputText
					htmlFor="kmDestino"
					label="Kilómetro"
					name="kmDestino"
					onChangeHandler={handleChangeDtddpd}
					isValid={true}
					firstTime={firstTimeInput.kmDestino}
					handleFirstTime={handleFirstTimeInput}
				/>

				<Button
					type="submit" 
						variant="contained"
						className="btn-principal submit"
						fullWidth
						size="medium" 
						endIcon={loading ? <CircularProgress size={20} /> : null} 
						disabled={loading}
				>
					Ingresar
				</Button>
			</FormDiv>
		</Container>
	);
};
