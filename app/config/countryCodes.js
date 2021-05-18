const countryCodes = [
	{
		name: "Afghanistan",
		dialCode: "+93",
		code: "AF",
		flag: "🇦🇫",
	},
	{
		name: "Albania",
		dialCode: "+355",
		code: "AL",
		flag: "🇦🇱",
	},
	{
		name: "Algeria",
		dialCode: "+213",
		code: "DZ",
		flag: "🇩🇿",
	},
	{
		name: "Angola",
		dialCode: "+244",
		code: "AO",
		flag: "🇦🇴",
	},
	{
		name: "Anguilla",
		dialCode: "+1264",
		code: "AI",
		flag: "🇦🇮",
	},
	{
		name: "Antigua and Barbuda",
		dialCode: "+1268",
		code: "AG",
		flag: "🇦🇬",
	},
	{
		name: "Argentina",
		dialCode: "+54",
		code: "AR",
		flag: "🇦🇷",
	},
	{
		name: "Armenia",
		dialCode: "+374",
		code: "AM",
		flag: "🇦🇲",
	},
	{
		name: "Aruba",
		dialCode: "+297",
		code: "AW",
		flag: "🇦🇼",
	},
	{
		name: "Australia",
		dialCode: "+61",
		code: "AU",
		flag: "🇦🇺",
	},
	{
		name: "Austria",
		dialCode: "+43",
		code: "AT",
		flag: "🇦🇹",
	},
	{
		name: "Bahamas",
		dialCode: "+1242",
		code: "BS",
		flag: "🇧🇸",
	},
	{
		name: "Bahrain",
		dialCode: "+973",
		code: "BH",
		flag: "🇧🇭",
	},
	{
		name: "Bangladesh",
		dialCode: "+880",
		code: "BD",
		flag: "🇧🇩",
	},
	{
		name: "Belarus",
		dialCode: "+375",
		code: "BY",
		flag: "🇧🇾",
	},
	{
		name: "Belgium",
		dialCode: "+32",
		code: "BE",
		flag: "🇧🇪",
	},
	{
		name: "Belize",
		dialCode: "+501",
		code: "BZ",
		flag: "🇧🇿",
	},
	{
		name: "Benin",
		dialCode: "+229",
		code: "BJ",
		flag: "🇧🇯",
	},
	{
		name: "Bosnia and Herzegovina",
		dialCode: "+387",
		code: "BA",
		flag: "🇧🇦",
	},
	{
		name: "Brazil",
		dialCode: "+55",
		code: "BR",
		flag: "🇧🇷",
	},
	{
		name: "Bulgaria",
		dialCode: "+359",
		code: "BG",
		flag: "🇧🇬",
	},
	{
		name: "Burkina Faso",
		dialCode: "+226",
		code: "BF",
		flag: "🇧🇫",
	},
	{
		name: "Cambodia",
		dialCode: "+855",
		code: "KH",
		flag: "🇰🇭",
	},
	{
		name: "Cameroon",
		dialCode: "+237",
		code: "CM",
		flag: "🇨🇲",
	},
	{
		name: "Canada",
		dialCode: "+1",
		code: "CA",
		flag: "🇨🇦",
	},
	{
		name: "Cayman Islands",
		dialCode: "+345",
		code: "KY",
		flag: "🇰🇾",
	},
	{
		name: "Chad",
		dialCode: "+235",
		code: "TD",
		flag: "🇹🇩",
	},
	{
		name: "Chile",
		dialCode: "+56",
		code: "CL",
		flag: "🇨🇱",
	},
	{
		name: "China",
		dialCode: "+86",
		code: "CN",
		flag: "🇨🇳",
	},
	{
		name: "Colombia",
		dialCode: "+57",
		code: "CO",
		flag: "🇨🇴",
	},
	{
		name: "Costa Rica",
		dialCode: "+506",
		code: "CR",
		flag: "🇨🇷",
	},
	{
		name: "Croatia",
		dialCode: "+385",
		code: "HR",
		flag: "🇭🇷",
	},
	{
		name: "Cyprus",
		dialCode: "+537",
		code: "CY",
		flag: "🇨🇾",
	},
	{
		name: "Czech Republic",
		dialCode: "+420",
		code: "CZ",
		flag: "🇨🇿",
	},
	{
		name: "Denmark",
		dialCode: "+45",
		code: "DK",
		flag: "🇩🇰",
	},
	{
		name: "Dominican Republic",
		dialCode: "+1849",
		code: "DO",
		flag: "🇩🇴",
	},
	{
		name: "Ecuador",
		dialCode: "+593",
		code: "EC",
		flag: "🇪🇨",
	},
	{
		name: "Egypt",
		dialCode: "+20",
		code: "EG",
		flag: "🇪🇬",
	},
	{
		name: "El Salvador",
		dialCode: "+503",
		code: "SV",
		flag: "🇸🇻",
	},
	{
		name: "Estonia",
		dialCode: "+372",
		code: "EE",
		flag: "🇪🇪",
	},
	{
		name: "Faroe Islands",
		dialCode: "+298",
		code: "FO",
		flag: "🇫🇴",
	},
	{
		name: "Fiji",
		dialCode: "+679",
		code: "FJ",
		flag: "🇫🇯",
	},
	{
		name: "Finland",
		dialCode: "+358",
		code: "FI",
		flag: "🇫🇮",
	},
	{
		name: "France",
		dialCode: "+33",
		code: "FR",
		flag: "🇫🇷",
	},
	{
		name: "French Guiana",
		dialCode: "+594",
		code: "GF",
		flag: "🇬🇫",
	},
	{
		name: "French Polynesia",
		dialCode: "+689",
		code: "PF",
		flag: "🇵🇫",
	},
	{
		name: "Gambia",
		dialCode: "+220",
		code: "GM",
		flag: "🇬🇲",
	},
	{
		name: "Georgia",
		dialCode: "+995",
		code: "GE",
		flag: "🇬🇪",
	},
	{
		name: "Germany",
		dialCode: "+49",
		code: "DE",
		flag: "🇩🇪",
	},
	{
		name: "Ghana",
		dialCode: "+233",
		code: "GH",
		flag: "🇬🇭",
	},
	{
		name: "Gibraltar",
		dialCode: "+350",
		code: "GI",
		flag: "🇬🇮",
	},
	{
		name: "Greece",
		dialCode: "+30",
		code: "GR",
		flag: "🇬🇷",
	},
	{
		name: "Greenland",
		dialCode: "+299",
		code: "GL",
		flag: "🇬🇱",
	},
	{
		name: "Guadeloupe",
		dialCode: "+590",
		code: "GP",
		flag: "🇬🇵",
	},
	{
		name: "Guam",
		dialCode: "+1671",
		code: "GU",
		flag: "🇬🇺",
	},
	{
		name: "Guatemala",
		dialCode: "+502",
		code: "GT",
		flag: "🇬🇹",
	},
	{
		name: "Guernsey",
		dialCode: "+44",
		code: "GG",
		flag: "🇬🇬",
	},
	{
		name: "Guinea",
		dialCode: "+224",
		code: "GN",
		flag: "🇬🇳",
	},
	{
		name: "Guyana",
		dialCode: "+595",
		code: "GY",
		flag: "🇬🇾",
	},
	{
		name: "Haiti",
		dialCode: "+509",
		code: "HT",
		flag: "🇭🇹",
	},
	{
		name: "Honduras",
		dialCode: "+504",
		code: "HN",
		flag: "🇭🇳",
	},
	{
		name: "Hong Kong",
		dialCode: "+852",
		code: "HK",
		flag: "🇭🇰",
	},
	{
		name: "Hungary",
		dialCode: "+36",
		code: "HU",
		flag: "🇭🇺",
	},
	{
		name: "Iceland",
		dialCode: "+354",
		code: "IS",
		flag: "🇮🇸",
	},
	{
		name: "India",
		dialCode: "+91",
		code: "IN",
		flag: "🇮🇳",
	},
	{
		name: "Indonesia",
		dialCode: "+62",
		code: "ID",
		flag: "🇮🇩",
	},
	{
		name: "Iraq",
		dialCode: "+964",
		code: "IQ",
		flag: "🇮🇶",
	},
	{
		name: "Ireland",
		dialCode: "+353",
		code: "IE",
		flag: "🇮🇪",
	},
	{
		name: "Isle of Man",
		dialCode: "+44",
		code: "IM",
		flag: "🇮🇲",
	},
	{
		name: "Israel",
		dialCode: "+972",
		code: "IL",
		flag: "🇮🇱",
	},
	{
		name: "Italy",
		dialCode: "+39",
		code: "IT",
		flag: "🇮🇹",
	},
	{
		name: "Japan",
		dialCode: "+81",
		code: "JP",
		flag: "🇯🇵",
	},
	{
		name: "Jersey",
		dialCode: "+44",
		code: "JE",
		flag: "🇯🇪",
	},
	{
		name: "Jordan",
		dialCode: "+962",
		code: "JO",
		flag: "🇯🇴",
	},
	{
		name: "Kazakhstan",
		dialCode: "+77",
		code: "KZ",
		flag: "🇰🇿",
	},
	{
		name: "Kenya",
		dialCode: "+254",
		code: "KE",
		flag: "🇰🇪",
	},
	{
		name: "Kuwait",
		dialCode: "+965",
		code: "KW",
		flag: "🇰🇼",
	},
	{
		name: "Kyrgyzstan",
		dialCode: "+996",
		code: "KG",
		flag: "🇰🇬",
	},
	{
		name: "Latvia",
		dialCode: "+371",
		code: "LV",
		flag: "🇱🇻",
	},
	{
		name: "Liberia",
		dialCode: "+231",
		code: "LR",
		flag: "🇱🇷",
	},
	{
		name: "Liechtenstein",
		dialCode: "+423",
		code: "LI",
		flag: "🇱🇮",
	},
	{
		name: "Lithuania",
		dialCode: "+370",
		code: "LT",
		flag: "🇱🇹",
	},
	{
		name: "Luxembourg",
		dialCode: "+352",
		code: "LU",
		flag: "🇱🇺",
	},
	{
		name: "Malaysia",
		dialCode: "+60",
		code: "MY",
		flag: "🇲🇾",
	},
	{
		name: "Mali",
		dialCode: "+223",
		code: "ML",
		flag: "🇲🇱",
	},
	{
		name: "Malta",
		dialCode: "+356",
		code: "MT",
		flag: "🇲🇹",
	},
	{
		name: "Martinique",
		dialCode: "+596",
		code: "MQ",
		flag: "🇲🇶",
	},
	{
		name: "Mauritania",
		dialCode: "+222",
		code: "MR",
		flag: "🇲🇷",
	},
	{
		name: "Mauritius",
		dialCode: "+230",
		code: "MU",
		flag: "🇲🇺",
	},
	{
		name: "Mayotte",
		dialCode: "+262",
		code: "YT",
		flag: "🇾🇹",
	},
	{
		name: "Mexico",
		dialCode: "+52",
		code: "MX",
		flag: "🇲🇽",
	},
	{
		name: "Monaco",
		dialCode: "+377",
		code: "MC",
		flag: "🇲🇨",
	},
	{
		name: "Mongolia",
		dialCode: "+976",
		code: "MN",
		flag: "🇲🇳",
	},
	{
		name: "Montenegro",
		dialCode: "+382",
		code: "ME",
		flag: "🇲🇪",
	},
	{
		name: "Montserrat",
		dialCode: "+1664",
		code: "MS",
		flag: "🇲🇸",
	},
	{
		name: "Morocco",
		dialCode: "+212",
		code: "MA",
		flag: "🇲🇦",
	},
	{
		name: "Mozambique",
		dialCode: "+258",
		code: "MZ",
		flag: "🇲🇿",
	},
	{
		name: "Myanmar",
		dialCode: "+95",
		code: "MM",
		flag: "🇲🇲",
	},
	{
		name: "Nauru",
		dialCode: "+674",
		code: "NR",
		flag: "🇳🇷",
	},
	{
		name: "Netherlands",
		dialCode: "+31",
		code: "NL",
		flag: "🇳🇱",
	},
	{
		name: "Netherlands Antilles",
		dialCode: "+599",
		code: "AN",
		flag: "🇦🇳",
	},
	{
		name: "New Zealand",
		dialCode: "+64",
		code: "NZ",
		flag: "🇳🇿",
	},
	{
		name: "Niger",
		dialCode: "+227",
		code: "NE",
		flag: "🇳🇪",
	},
	{
		name: "Nigeria",
		dialCode: "+234",
		code: "NG",
		flag: "🇳🇬",
	},
	{
		name: "Northern Mariana Islands",
		dialCode: "+1670",
		code: "MP",
		flag: "🇲🇵",
	},
	{
		name: "Norway",
		dialCode: "+47",
		code: "NO",
		flag: "🇳🇴",
	},
	{
		name: "Oman",
		dialCode: "+968",
		code: "OM",
		flag: "🇴🇲",
	},
	{
		name: "Pakistan",
		dialCode: "+92",
		code: "PK",
		flag: "🇵🇰",
	},
	{
		name: "Panama",
		dialCode: "+507",
		code: "PA",
		flag: "🇵🇦",
	},
	{
		name: "Papua New Guinea",
		dialCode: "+675",
		code: "PG",
		flag: "🇵🇬",
	},
	{
		name: "Paraguay",
		dialCode: "+595",
		code: "PY",
		flag: "🇵🇾",
	},
	{
		name: "Peru",
		dialCode: "+51",
		code: "PE",
		flag: "🇵🇪",
	},
	{
		name: "Philippines",
		dialCode: "+63",
		code: "PH",
		flag: "🇵🇭",
	},
	{
		name: "Poland",
		dialCode: "+48",
		code: "PL",
		flag: "🇵🇱",
	},
	{
		name: "Portugal",
		dialCode: "+351",
		code: "PT",
		flag: "🇵🇹",
	},
	{
		name: "Qatar",
		dialCode: "+974",
		code: "QA",
		flag: "🇶🇦",
	},
	{
		name: "Romania",
		dialCode: "+40",
		code: "RO",
		flag: "🇷🇴",
	},
	{
		name: "Russia",
		dialCode: "+7",
		code: "RU",
		flag: "🇷🇺",
	},
	{
		name: "Saint Kitts and Nevis",
		dialCode: "+1869",
		code: "KN",
		flag: "🇰🇳",
	},
	{
		name: "Saint Lucia",
		dialCode: "+1758",
		code: "LC",
		flag: "🇱🇨",
	},
	{
		name: "Saint Martin",
		dialCode: "+590",
		code: "MF",
		flag: "🇲🇫",
	},
	{
		name: "Samoa",
		dialCode: "+685",
		code: "WS",
		flag: "🇼🇸",
	},
	{
		name: "San Marino",
		dialCode: "+378",
		code: "SM",
		flag: "🇸🇲",
	},
	{
		name: "Saudi Arabia",
		dialCode: "+966",
		code: "SA",
		flag: "🇸🇦",
	},
	{
		name: "Senegal",
		dialCode: "+221",
		code: "SN",
		flag: "🇸🇳",
	},
	{
		name: "Serbia",
		dialCode: "+381",
		code: "RS",
		flag: "🇷🇸",
	},
	{
		name: "Seychelles",
		dialCode: "+248",
		code: "SC",
		flag: "🇸🇨",
	},
	{
		name: "Singapore",
		dialCode: "+65",
		code: "SG",
		flag: "🇸🇬",
	},
	{
		name: "Slovakia",
		dialCode: "+421",
		code: "SK",
		flag: "🇸🇰",
	},
	{
		name: "Slovenia",
		dialCode: "+386",
		code: "SI",
		flag: "🇸🇮",
	},
	{
		name: "South Africa",
		dialCode: "+27",
		code: "ZA",
		flag: "🇿🇦",
	},
	{
		name: "Spain",
		dialCode: "+34",
		code: "ES",
		flag: "🇪🇸",
	},
	{
		name: "Sri Lanka",
		dialCode: "+94",
		code: "LK",
		flag: "🇱🇰",
	},
	{
		name: "Suriname",
		dialCode: "+597",
		code: "SR",
		flag: "🇸🇷",
	},
	{
		name: "Sweden",
		dialCode: "+46",
		code: "SE",
		flag: "🇸🇪",
	},
	{
		name: "Switzerland",
		dialCode: "+41",
		code: "CH",
		flag: "🇨🇭",
	},
	{
		name: "Tajikistan",
		dialCode: "+992",
		code: "TJ",
		flag: "🇹🇯",
	},
	{
		name: "Thailand",
		dialCode: "+66",
		code: "TH",
		flag: "🇹🇭",
	},
	{
		name: "Tonga",
		dialCode: "+676",
		code: "TO",
		flag: "🇹🇴",
	},
	{
		name: "Trinidad and Tobago",
		dialCode: "+1868",
		code: "TT",
		flag: "🇹🇹",
	},
	{
		name: "Tunisia",
		dialCode: "+216",
		code: "TN",
		flag: "🇹🇳",
	},
	{
		name: "Turkey",
		dialCode: "+90",
		code: "TR",
		flag: "🇹🇷",
	},
	{
		name: "Turks and Caicos Islands",
		dialCode: "+1649",
		code: "TC",
		flag: "🇹🇨",
	},
	{
		name: "Uganda",
		dialCode: "+256",
		code: "UG",
		flag: "🇺🇬",
	},
	{
		name: "United Arab Emirates",
		dialCode: "+971",
		code: "AE",
		flag: "🇦🇪",
	},
	{
		name: "United Kingdom",
		dialCode: "+44",
		code: "GB",
		flag: "🇬🇧",
	},
	{
		name: "United States",
		dialCode: "+1",
		code: "US",
		flag: "🇺🇸",
	},
	{
		name: "Uzbekistan",
		dialCode: "+998",
		code: "UZ",
		flag: "🇺🇿",
	},
	{
		name: "Zambia",
		dialCode: "+260",
		code: "ZM",
		flag: "🇿🇲",
	},
	{
		name: "Zimbabwe",
		dialCode: "+263",
		code: "ZW",
		flag: "🇿🇼",
	},
];

export default countryCodes;
