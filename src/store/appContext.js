import axios from 'axios';
import React, { createContext, useState, useCallback, useEffect } from 'react';

const AppContext = createContext({
  data: [],
  lang: '',
  onChooseLang: () => {},
  detail: {},
  isLoading: Boolean,
  error: null,
  showModalState: Boolean,
  hideModal: () => {},
  showModal: () => {},
});

export const AppContextProvider = (props) => {
  const [lang, setLang] = useState('cs');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [detail, setDetail] = useState({});

  const chooseLangHandler = (lang) => {
    setLang(lang);
  };

  const url =
    'https://private-anon-510a79a142-golemioapi.apiary-mock.com/v2/medicalinstitutions/?latlng=&range=&districts=&group=&limit=&offset=&updatedSince=';
  //'https://private-anon-510a79a142-golemioapi.apiary-mock.com/v2/gardens/?latlng=&range=&districts=&limit=&offset=&updatedSince=';

  const productionUrl =
    'https://api.golemio.cz/v2/medicalinstitutions/?latlng=&range=&districts=&group=&limit=20&offset=&updatedSince=';

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhY2thdGhvbkBnb2xlbWlvLmN6IiwiaWQiOjIsIm5hbWUiOiJIYWNrYXRob24iLCJzdXJuYW1lIjoiR29sZW1pbyIsImlhdCI6MTU4NDU0NDYzMSwiZXhwIjoxMTU4NDU0NDYzMSwiaXNzIjoiZ29sZW1pbyIsImp0aSI6IjVlNjU2NDQxLTA4OGUtNDYyYS1iMjUyLTFiNzI1OGU0ZGJkYSJ9.ypDAJirgEs8VBSauraFEoLTTtC6y_F8V1fheAHgzMos';

  const myToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhdHJpay5jZXByQGdtYWlsLmNvbSIsImlkIjoxMDQ2LCJuYW1lIjpudWxsLCJzdXJuYW1lIjpudWxsLCJpYXQiOjE2NDIzNTE2NzcsImV4cCI6MTE2NDIzNTE2NzcsImlzcyI6ImdvbGVtaW8iLCJqdGkiOiJhMGQ3NWM2MS1mOTkxLTRkZWEtOGNlZi1hZjg0NGQyZjBhOWYifQ.tr4ZhXhIGVqGz9dzWoyGI-iRFCuvfON16nbhlwcyfiw';

  const getDataHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(productionUrl, {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': myToken,
        },
      });
      const data = response.data.features;
      setData(() => data);
      console.log(data);
    } catch (error) {
      console.log('error', error);
      setError(() => error.message);
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getDataHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hideModalHandler = () => {
    setShowModal(false);
  };

  const showModalHandler = (index) => {
    setDetail(data[index]);
    setShowModal(true);
  };

  return (
    <AppContext.Provider
      value={{
        data: data,
        isLoading: isLoading,
        error: error,
        lang: lang,
        onChooseLang: chooseLangHandler,
        showModalState: showModal,
        detail: detail,
        hideModal: hideModalHandler,
        showModal: showModalHandler,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
