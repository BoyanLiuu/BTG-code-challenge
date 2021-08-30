import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { ReactComponent as SearchIcon } from "./../../assets/images/desktop/icon-search.svg";
import filterIcon from "./../../assets/images/mobile/icon-filter.svg";
import locationIcon from "./../../assets/images/desktop/icon-location.svg";
import { AutoComplete } from "antd";

const SearchBarStyledContainer = styled.div`
	margin: -4rem 2.4rem 0 2.4rem;
	height: 8rem;
	border-radius: 0.6rem;
	background-color: ${(props) => props.theme.cardColor};
	display: flex;
	align-items: center;
	padding: 0 2.4rem;
	margin-bottom: 3.2rem;

	.title-container {
		width: 100%;
		padding: 0 2rem 0 0;
		.search-icon {
			display: none;
		}
	}

	.location-container--tablet,
	.search-btn--tablet {
		display: none;
	}

	input {
		width: 100%;
		border: none;
		outline: none;
		height: 2.1rem;
		font-size: 1.6rem;
		line-height: 2.1rem;
		font-family: "Kumbh Sans", sans-serif;
		text-overflow: ellipsis;
		color: ${(props) => props.theme.searchInputColor};
		background-color: ${(props) => props.theme.cardColor};
		&::placeholder {
			color: ${(props) => props.theme.searchInputColor};
			transition: color ease-in-out 0.2s;
			opacity: 0.5;
			font-size: 1.6rem;
			line-height: 2.1rem;
			font-family: "Kumbh Sans", sans-serif;
		}
	}
	.searchBar--mobile {
		display: flex;
		align-items: center;

		.search-icon-wrapper {
			width: 4.8rem;
			height: 4.8rem;
			background-color: var(--violet-color);
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 0.5rem;
		}
		.filter-icon {
			margin-right: 2.4rem;
			cursor: pointer;
		}
		.search-icon {
			cursor: pointer;
		}
	}
	.modal {
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 1;
		top: 0;
		left: 0;
		opacity: 0;
		visibility: hidden;
		background-color: rgba(0, 0, 0, 0.5);

		transform: scale(1.1);
		transition: visibility 0s linear 0.25s, opacity 0.25s 0s,
			transform 0.25s;
	}
	.searchBar--modal {
		width: 90%;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 0.6rem;
		background-color: ${(props) => props.theme.cardColor};
		.location-container {
			display: flex;
			align-self: flex-start;
		}
	}

	.location-container {
		width: 100%;
		padding: 2.4rem 0 2.4rem 2.4rem;
	}
	.location-container {
		border-bottom: 1px solid var(--dark-grey-opacity-color);
		.location-icon {
			margin-right: 1.6rem;
		}
	}

	.search-btn {
		height: 4.8rem;
		margin-top: 2rem;
		width: 80%;
		cursor: pointer;
		border-radius: 0.5rem;
		border: none;
		outline: none;
		color: white;
		font-size: 1.6rem;
		line-height: 2.1rem;
		font-family: "Kumbh Sans", sans-serif;
		background-color: var(--violet-color);

		&:hover {
			background-color: var(--light-violet-color);
		}
	}

	.show-modal {
		opacity: 1;
		visibility: visible;
		transform: scale(1);
		transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
	}

	.ant-select:not(.ant-select-disabled):hover .ant-select-selector {
		border: none;
	}

	.ant-select:not(.ant-select-customize-input) .ant-select-selector {
		border: none;
	}
	/* Tablet view style */
	@media (min-width: 768px) {
		.searchBar--mobile {
			display: none;
		}
		.location-container--tablet {
			display: flex;
			width: calc((100% - 15rem) * 0.45);
			border-bottom: none;
			border-right: 1px solid var(--dark-grey-opacity-color);
		}

		.search-btn--tablet {
			display: block;
			flex: 1;
		}

		.title-container {
			width: calc((100% - 15rem) * 0.4);
			height: 100%;
			display: flex;
			align-items: center;

			border-right: 1px solid var(--dark-grey-opacity-color);
			input {
				margin-left: 1.6rem;
				width: 100%;
			}
			.search-icon {
				display: inline-block;
				& path {
					fill: var(--violet-color);
				}
			}
		}

		.searchBar--modal {
			display: none;
		}

		.search-btn {
			width: 10rem;
			margin: 0 0 0 2rem;
		}
	}
	/* Desktop vie style */
	@media (min-width: 1440px) {
		width: 70%;
		.title-container {
			width: calc((100% - 15rem) * 0.5);
			input {
				width: 100%;
			}
		}
		.location-container--tablet {
			width: calc((100% - 15rem) * 0.35);
		}
	}
`;

const SearchBar = React.memo(({ setSearchField }) => {
	const [show, setShow] = useState(false);
	// this is used for country autocomplete
	const [countriesName, setCountriesName] = useState([]);
	//used for capture field we want to search
	const [filterField, setFilterField] = useState({
		university: "",
		country: "",
	});
	// fired up when we press enter or click search button
	const handleSearch = () => {
		setSearchField(filterField);
		setShow(false);
	};
	// fetch whole data and store it into localstorage and use it in the Home page
	async function fetchUniversityData() {
		const endpoint = `https://university-domains-list-api.herokuapp.com/search`;
		//using await to wait for finishing fetching and store it into an array
		const result = await fetch(endpoint, {
			headers: { Origin: window.location.host },
		}).then((res) => res.json());
		localStorage.setItem("wholeData", JSON.stringify(result));
		//Store list of countries name we have used in our data sets.
		const set = new Set();
		const countriesList = [];
		result.forEach((ele) => {
			if (!set.has(ele.country)) {
				countriesList.push({ value: ele.country });
				set.add(ele.country);
			}
		});

		setCountriesName(countriesList);
	}

	useEffect(() => {
		fetchUniversityData();
	}, []);

	// allow enter to start search
	const handleKeyDown = (e) => {
		if (e.keyCode === 13) handleSearch();
	};
	const modelClasses = show ? "modal show-modal" : "modal";
	return (
		<SearchBarStyledContainer>
			<div className='title-container'>
				<SearchIcon className='search-icon' />
				<input
					placeholder='Filter by university name'
					aria-label='Enter university name'
					value={filterField.university}
					onKeyDown={handleKeyDown}
					onChange={(e) => {
						setFilterField({
							...filterField,
							university: e.target.value,
						});
					}}
				/>
			</div>
			<div className='location-container location-container--tablet'>
				<img
					src={locationIcon}
					alt='location-icon'
					className='location-icon'
				/>

				<AutoComplete
					style={{ width: "100%" }}
					placeholder='Filter by country'
					aria-label='Enter country name'
					options={countriesName}
					filterOption={(inputValue, option) =>
						option.value
							.toUpperCase()
							.indexOf(inputValue.toUpperCase()) !== -1
					}
					onKeyDown={handleKeyDown}
					onChange={(e) => {
						setFilterField({
							...filterField,
							country: e,
						});
					}}
				/>
			</div>

			<button
				onClick={handleSearch}
				className='search-btn search-btn--tablet'
			>
				Search
			</button>

			<div className='searchBar--mobile'>
				<img
					src={filterIcon}
					alt='filter-icon'
					className='filter-icon'
					onClick={() => setShow(true)}
				/>
				<div className='search-icon-wrapper'>
					<SearchIcon className='search-icon' />
				</div>
			</div>
			<div className={modelClasses} onClick={() => setShow(false)}>
				<div
					className='searchBar--modal'
					onClick={(e) => e.stopPropagation()}
				>
					<div className='location-container'>
						<img
							src={locationIcon}
							alt='location-icon'
							className='location-icon'
						/>
						<AutoComplete
							style={{ width: "100%" }}
							placeholder='Filter by country'
							aria-label='Enter country name'
							options={countriesName}
							filterOption={(inputValue, option) =>
								option.value
									.toUpperCase()
									.indexOf(inputValue.toUpperCase()) !== -1
							}
							onKeyDown={handleKeyDown}
							onChange={(e) => {
								setFilterField({
									...filterField,
									country: e,
								});
							}}
						/>
					</div>
					<button
						type='submit'
						className='search-btn'
						onClick={handleSearch}
					>
						Search
					</button>
				</div>
			</div>
		</SearchBarStyledContainer>
	);
});

export default SearchBar;
