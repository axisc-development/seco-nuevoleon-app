import {
  SELECT_CRIME,
  SET_DATA,
  SET_MONTH_YEAR,
  SET_SLIDER_VALUE,
  SET_MONTH_APP,
  SET_LIST_MSEJRAFO,
  SET_LIST_CORPORATIONS,
  SET_LIST_CORPORATIONS_SELECTED,
  SET_LIST_CRIMES,
  SET_LIST_CRIMES_SELECTED,
  SET_LIST_MUNICIPALITIES,
  SET_LIST_MUNICIPALITIES_SELECTED,
  SET_LIST_DATES_SELECTED,
  SET_ALL_DATES_SELECTED,
  SET_ALL_MUNICIPALITIES_SELECTED,
  SET_MARKERS,
  SET_YEAR_SELECTED,
  UPDATE_SELECTED_DATE,
  CHANGE_TAB_COLOR,
} from '../../constants';

// const today = new Date();
// const yearSelected = today.getFullYear();
// const monthSelected = today.getMonth();

const yearsAgo = 2; // años que se veran en el slider
const totalMonths = 12 * yearsAgo + 1;
const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const listMonthsYearStringPreloaded = [];
const listMonthsPreloaded = [];
const listYearsPreloaded = [];
for (let i = 0; i < totalMonths; i++) {
  const newDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth() - i,
    new Date().getDate(),
  );

  const monthNumber = newDate.getMonth();
  const monthWord = months[monthNumber];
  const yearNumber = newDate.getFullYear();
  const monthYearString = `${monthWord} ${yearNumber}`;

  listMonthsPreloaded.push(monthNumber);
  listYearsPreloaded.push(yearNumber);
  listMonthsYearStringPreloaded.push(monthYearString);
}

const monthYearString = listMonthsYearStringPreloaded[0];
const yearSelected = listYearsPreloaded[0];
const monthSelected = listMonthsPreloaded[0];

listMonthsYearStringPreloaded.reverse();
listMonthsPreloaded.reverse();
listYearsPreloaded.reverse();

const initialState = {
  isAnotherColorTab: false,
  dataCorporations: [],
  dataCorporationsSelected: [],
  dataCrime: {},
  dataCrimes: [],
  dataCrimesSelected: [],
  dataMsejrafo: [],
  selectedCrime: '',
  dataMunicipalities: [],
  dataMunicipalitiesSelected: [],
  dataDates: [
    {name: 'Enero', slug: '01', pk: '1'},
    {name: 'Febrero', slug: '02', pk: '2'},
    {name: 'Marzo', slug: '03', pk: '3'},
    {name: 'Abril', slug: '04', pk: '4'},
    {name: 'Mayo', slug: '05', pk: '5'},
    {name: 'Junio', slug: '06', pk: '6'},
    {name: 'Julio', slug: '07', pk: '7'},
    {name: 'Agosto', slug: '08', pk: '8'},
    {name: 'Septiembre', slug: '09', pk: '9'},
    {name: 'Octubre', slug: '10', pk: '10'},
    {name: 'Noviembre', slug: '11', pk: '11'},
    {name: 'Diciembre', slug: '12', pk: '12'},
  ],
  dataDatesSelected: [String(monthSelected + 1).padStart(2, '0')],
  areAllDatesSelected: false,
  areAllMunicipalitiesSelected: false,
  dataMarkers: [],

  yearInitial: yearSelected,
  yearSelected,
  monthSelected,

  listMonthsYearStringPreloaded,
  listMonthsPreloaded,
  listYearsPreloaded,

  totalMonths,
  monthYearString,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_CRIME: {
      const {crime} = action.payload;
      return {...state, selectedCrime: crime, dataCrimesSelected: [crime]};
    }
    case SET_DATA: {
      const {data} = action.payload;
      return {...state, dataCrime: data};
    }
    case SET_MONTH_YEAR: {
      const {month, year, monthYearString2} = action.payload;
      return {
        ...state,
        month,
        year,
        monthYearString2,
      };
    }
    case SET_MONTH_APP: {
      return {
        ...state,
        initialMonthApp: action.payload,
      };
    }
    case SET_SLIDER_VALUE: {
      return {...state, sliderValue: action.payload};
    }
    case SET_LIST_MSEJRAFO: {
      return {...state, dataMsejrafo: action.payload};
    }
    case SET_LIST_CORPORATIONS: {
      return {...state, dataCorporations: action.payload};
    }
    case SET_LIST_CORPORATIONS_SELECTED: {
      return {...state, dataCorporationsSelected: action.payload};
    }
    case SET_LIST_CRIMES: {
      return {...state, dataCrimes: action.payload};
    }
    case SET_LIST_CRIMES_SELECTED: {
      return {...state, dataCrimesSelected: action.payload};
    }
    case SET_LIST_MUNICIPALITIES: {
      return {...state, dataMunicipalities: action.payload};
    }
    case SET_LIST_MUNICIPALITIES_SELECTED: {
      return {...state, dataMunicipalitiesSelected: action.payload};
    }
    case SET_LIST_DATES_SELECTED: {
      return {...state, dataDatesSelected: action.payload};
    }
    case SET_ALL_DATES_SELECTED: {
      return {...state, areAllDatesSelected: action.payload};
    }
    case SET_ALL_MUNICIPALITIES_SELECTED: {
      return {...state, areAllMunicipalitiesSelected: action.payload};
    }
    case SET_MARKERS: {
      return {...state, dataMarkers: action.payload};
    }
    case SET_YEAR_SELECTED: {
      return {...state, yearSelected: action.payload};
    }
    case UPDATE_SELECTED_DATE: {
      const {month, year} = action.payload;
      return {
        ...state,
        // scene[statisctics]
        yearSelected: year,
        monthSelected: month,
        // scene[map - date]
        dataDatesSelected: [String(month + 1).padStart(2, '0')],
      };
    }
    case CHANGE_TAB_COLOR: {
      return {...state, isAnotherColorTab: action.payload};
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
