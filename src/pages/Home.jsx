import styled from "styled-components";
import {
	SearchBar,
	UniversityCard,
	SkeletonUniversityCard,
} from "./../components/index";
import { useState, useEffect } from "react";
import { Pagination } from "antd";
import NoresultIcon from "./../assets/images/data-not-found.svg";

const HomeDiv = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100vw;
	padding-bottom: 10rem;

	.university-lists {
		width: 90vw;
		margin: 3.2rem auto 3rem;
		display: grid;
		row-gap: 4.9rem;
		transition: all 0.08s ease;
	}
	.no-result-icon {
		width: 20rem;
		height: 20rem;
	}
	@media (min-width: 768px) {
		.university-lists {
			grid-template-columns: 1fr 1fr;
			gap: 6.5rem 1.8rem;
		}
	}

	@media (min-width: 1000px) {
		.university-lists {
			grid-template-columns: repeat(3, 1fr);
			gap: 6.5rem 1.8rem;
		}
	}

	@media (min-width: 1440px) {
		.university-lists {
			width: 75%;
			grid-template-columns: repeat(4, 1fr);
			gap: 6.5rem 3rem;
		}
	}
`;

function Home() {
	const [searchField, setSearchField] = useState({
		university: "",
		country: "",
	});
	const [ready, setReady] = useState(false);
	const [dataNoFound, setDataNoFound] = useState(false);
	const [universityData, setUniversityData] = useState([]);
	const paginationInitial = {
		current: 1,
		pageSize: 10,
		pageSizeOptions: ["10", "20", "50", "100"],
		total: 50,
		data: [],
	};

	const [universityPagination, setUniversityPagination] =
		useState(paginationInitial);

	useEffect(() => {
		async function fetchUniversityData() {
			let result = [];
			if (
				localStorage.wholeData &&
				searchField.university === "" &&
				searchField.country === ""
			) {
				// if we can find all data from localstorage we get it immediately
				result = JSON.parse(localStorage.getItem("wholeData"));
			} else {
				const endpoint = `https://university-domains-list-api.herokuapp.com/search?name=${searchField.university}&country=${searchField.country}`;
				result = await fetch(endpoint, {
					headers: { Origin: window.location.host },
				}).then((res) => res.json());
			}

			setReady(true);
			if (result.length === 0) setDataNoFound(true);

			// initially we only display first 10 data
			setUniversityData(result);
			/*Set up pagination information */
			setUniversityPagination((prev) => {
				let curr = { ...prev };
				curr.total = result.length;
				curr.data = result.slice(0, 10);
				return curr;
			});
		}

		fetchUniversityData();
	}, [searchField]);

	// event listener for change page size and page number
	const onShowSizeChange = (current, pageSize) => {
		const newPagination = { ...universityPagination };
		newPagination.current = current;
		newPagination.pageSize = pageSize;
		// If we only change pagesize
		if (pageSize !== universityPagination.pageSize) {
			newPagination.data = universityData.slice(
				universityPagination.current - 1,
				pageSize
			);
		} else {
			// if we modify page number
			newPagination.data = universityData.slice(
				(current - 1) * pageSize,
				current * pageSize
			);
		}

		setUniversityPagination(newPagination);
	};
	//generate skeletonCard
	const skeletonItems = Array(10)
		.fill()
		.map((item, index) => {
			return <SkeletonUniversityCard key={index} />;
		});

	const renderUniversityList = universityPagination.data.map(
		(item, index) => {
			return <UniversityCard data={item} key={`${item.name}-${index}`} />;
		}
	);

	return (
		<HomeDiv>
			<SearchBar setSearchField={setSearchField} />
			{ready && !dataNoFound && (
				<>
					<div className='university-lists'>
						{renderUniversityList}
					</div>
					<Pagination
						{...universityPagination}
						className='ant-pagination'
						onChange={(current, pageSize) =>
							onShowSizeChange(current, pageSize)
						}
					/>
				</>
			)}

			{!ready && !dataNoFound && (
				<div className='university-lists'>{skeletonItems}</div>
			)}
			{ready && dataNoFound && (
				<>
					<img
						src={NoresultIcon}
						alt='no result'
						className='no-result-icon'
					/>
					<b>Sorry! No data found, Try Something else</b>
				</>
			)}
		</HomeDiv>
	);
}

export default Home;
