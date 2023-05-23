import { Button, Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import {
	Route,
	Routes,
	Link,
	NavLink,
	Navigate,
	useNavigate,
} from "react-router-dom";
import { useAuth, AuthProvider } from "../useAuth";
import { Logout } from "../utilities/Logout";
import { IngresarGuiaDeViaje } from "./IngresarGuiaDeViaje";

export const NavBarCustom = () => {
	const { isAuthenticated } = useAuth();

	const navigate = useNavigate();

	const handleBrandClick = () => {
		navigate("/");
	};

	return (
		<Navbar bg="white" expand="lg" className="shadow-sm">
			<Container>
				<Navbar.Brand onClick={handleBrandClick} style={{ cursor: "pointer" }}>
					<svg
						width={200}
						data-name="Layer 1"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 63.19 8.78"
					>
						<path
							style={{ fill: "#16b7b9" }}
							d="M10.32 4.4c0-2.08 1.52-3.69 3.82-3.69 1.26 0 2.04.45 2.37.69l-.62 1.12c-.16-.12-.73-.5-1.66-.5-1.48 0-2.45.93-2.45 2.36s.96 2.37 2.45 2.37c.93 0 1.49-.36 1.67-.48l.61 1.11c-.33.25-1.08.68-2.37.68-2.31 0-3.82-1.6-3.82-3.67Zm11.52 2.2h-3.07l-.57 1.39h-1.49L19.85.81h.93l3.12 7.18h-1.49l-.57-1.39Zm-2.62-1.19h2.17l-1.08-2.59-1.09 2.59Zm9.58 2.57-1.4-2.05h-1.24v2.05h-1.41V.81h2.56c1.75 0 2.91.99 2.91 2.59 0 1.02-.52 1.8-1.41 2.22l1.64 2.37h-1.66Zm-2.63-3.29h1.03c.95 0 1.57-.51 1.57-1.3 0-.86-.63-1.36-1.56-1.36h-1.04v2.65Zm11.46-.28v2.83c-.39.3-1.23.84-2.74.84-2.24 0-3.84-1.6-3.84-3.67S32.65.72 34.92.72c1.44 0 2.2.51 2.46.68l-.62 1.12c-.18-.12-.79-.49-1.78-.49-1.42 0-2.47.94-2.47 2.37s1.1 2.41 2.46 2.41c.54 0 .99-.11 1.33-.28V4.41h1.33Zm5.58 2.19h-3.07l-.57 1.39h-1.49L41.22.81h.93l3.12 7.18h-1.49l-.57-1.39Zm-2.62-1.19h2.17l-1.08-2.59-1.09 2.59Zm5.16 1.83c0-.46.36-.84.84-.84s.84.38.84.84-.37.84-.84.84-.84-.38-.84-.84Zm2.64-2.34V.81h1.41v4.2c0 .97.57 1.79 1.76 1.79s1.75-.82 1.75-1.79V.81h1.4V4.9c0 2.07-1.25 3.17-3.15 3.17s-3.15-1.1-3.15-3.17Zm11.23.29v2.8h-1.41v-2.8L55.58.81h1.68l1.71 2.99L60.69.81h1.59l-2.66 4.38ZM1.92 3.227l.335-.284.285.335-.336.285zM3.7 6.249l.327-.296.295.326-.326.296zM6.55 2.38l.43.03-.02.43-.44-.02.03-.44z"
						/>
						<path
							style={{ fill: "#16b7b9" }}
							d="M7.14.81H1.87c-.52 0-.95.43-.95.96v5.26c0 .53.43.96.95.96h5.27c.53 0 .95-.43.95-.96V1.77c0-.53-.42-.96-.95-.96Zm.21 1.62-.03.44-.02.36-.37-.02-.43-.03-.37-.02.02-.33h-.73l-.56 1.06.44 1.41-.73.73.02.02.24.27-.27.25-.33.28-.27.24-.25-.27-.28-.33-.24-.27.27-.24.33-.29.27-.24.22.25.52-.52-.32-1.03-1.28.4-.73-.73-.02.02-.28.24-.24-.27-.29-.33-.24-.27.28-.24.32-.29.28-.24.24.27.29.33.24.27-.25.22.52.52 1.15-.36.68-1.3h1.03v-.03l.03-.37.36.03.44.02.36.03-.02.36Z"
						/>
					</svg>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						{isAuthenticated && (
							<>
								<NavLink to="/ingresarGuiaDeViaje" className="nav-link">
									Ingresar Guía de Viaje
								</NavLink>
								<NavLink to="/asignarGuiaDeViaje" className="nav-link">
									Asignar Guía de Viaje
								</NavLink>
								<NavLink to="/perfil" className="nav-link">
									Perfil
								</NavLink>
							</>
						)}
					</Nav>
					<Nav className="ms-auto">
						{isAuthenticated ? (
							<Logout />
						) : (
							<NavLink
								to="/login
							"
								className="nav-link"
							>
								Ingresar
							</NavLink>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
