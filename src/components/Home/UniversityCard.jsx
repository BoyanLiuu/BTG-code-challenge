import styled from "styled-components";
import React from "react";
import defaultLogo from "./../../assets/images/desktop/icon-default.svg";
export const UniversityCardStyledContainer = styled.div`
	width: 100%;
	min-height: 23.1rem;
	height: fit-content;
	background-color: ${(props) => props.theme.cardColor};
	border-radius: 0.6rem;
	position: relative;
	transition: box-shadow ease-in 0.2s;

	.card__img--container {
		top: -2.5rem;
		left: 3.2rem;
		position: absolute;
		width: 5rem;
		height: 5rem;
		background: white;
		border: solid 0.1rem ${(props) => props.theme.cardShadowColor};
		box-shadow: 0.6rem 0.7rem 0 -0.1rem ${(props) => props.theme.cardLightShadowColor};

		transition: border ease 0.2s, box-shadow ease 0.2s;
		border-radius: 1.5rem;
		display: flex;
		justify-content: center;
		align-items: center;

		.card__img {
			width: 3rem;
			height: 3rem;
			object-fit: contain;
		}
	}

	.card__img--container:hover {
		border: solid 0.1rem var(--light-violet-color);
		box-shadow: 0.6rem 0.7rem 0 -0.1rem var(--half-light-violet-color);
	}

	.card__content {
		margin: 4.9rem 8% 2rem;
		width: 84%;
		min-height: 15rem;
		max-height: 15rem;
		.card__top,
		.card_country {
			display: block;
			width: 100%;
			height: 2.1rem;
			overflow: hidden;
			font-size: 1.6rem;
			line-height: 2.1rem;
			color: var(--dark-grey-color);
		}
		.card__dot {
			display: inline-block;
			width: 2.1rem;
			text-align: center;
			font-size: 2rem;
			font-weight: 700;
		}
		.card__link {
			min-height: 6.5rem;
			max-height: 6.5rem;
			width: 100%;
			display: block;
			padding: 0.5rem 1rem 0;
			margin: 0.8rem 0 0.3rem -1rem;
			transition: max-height ease-in-out 0.2s;

			.card__title {
				min-height: 5.5rem;
				max-height: 5.5rem;
				width: 100%;
				font-weight: 700;
				overflow: hidden;
				text-overflow: ellipsis;
				font-size: 2rem;
				line-height: 2.7rem;
				color: ${(props) => props.theme.cardTitleColor};
				transition: color ease-in-out 0.2s, max-height ease-in-out 0.2s;
			}
		}

		.card__link:hover {
			border-left: solid 0.2rem var(--violet-color);
			background-color: rgba(89, 100, 224, 0.1);
			border-radius: 0 0.6rem 0.6rem 0;
			margin: 0.8rem 0 0.3rem -1.2rem;
		}

		.card__domains {
			color: var(--violet-color);
			font-size: 1.4rem;
			line-height: 1.9rem;
			margin: 2.1rem 0 0;
			max-height: 1.9rem;
			word-break: break-all;
			span {
				font-weight: 700;
			}
		}
	}

	:hover {
		transform: translate(0rem, -0.5rem);
		box-shadow: 1rem 1.2rem 0rem -0.2rem ${(props) => props.theme.cardShadowColor};
		transition: transform ease-in 0.2s;
	}
`;

function UniversityCard({ data }) {
	let { alpha_two_code, country, domains, name, web_pages } = data;

	// need to make sure web_pages link start with http://
	if (!web_pages[0].startsWith("http")) {
		web_pages[0] = `http://${web_pages[0]}`;
	}

	return (
		<UniversityCardStyledContainer>
			<a
				className='card__link'
				href={web_pages[0]}
				target='_blank'
				rel='noreferrer'
				aria-label={`Link toward ${name} webpage`}
			>
				<div className='card__img--container'>
					<img
						src={`https://logo.clearbit.com/:${web_pages[0]}`}
						alt='univertsity logo'
						onError={(e) => {
							e.target.onerror = null;
							e.target.src = defaultLogo;
						}}
						className='card__img '
					/>
				</div>
			</a>

			<div className='card__content'>
				<a
					className='card__link'
					target='_blank'
					rel='noreferrer'
					href={`${web_pages[0]}`}
				>
					<p className='card__title'>{name}</p>
				</a>
				<p className='card_country'>{`${alpha_two_code},${country}`}</p>
				<p className='card__domains'>
					<span>Domains: </span>
					{domains.toString()}
				</p>
			</div>
		</UniversityCardStyledContainer>
	);
}

export default UniversityCard;
