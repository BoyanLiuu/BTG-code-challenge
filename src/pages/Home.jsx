import styled from "styled-components";
import { SearchBar } from "./../components/index";
import { useState } from "react";
const HomeDiv = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100vw;
`;

function Home() {
	const [filter, setFilter] = useState({
		description: "",
		location: "",
		fullTime: false,
	});
	return (
		<HomeDiv>
			<SearchBar setFilter={setFilter} />
		</HomeDiv>
	);
}

export default Home;
