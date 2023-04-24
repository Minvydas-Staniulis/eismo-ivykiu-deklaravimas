// playground requires you to assign document definition to a variable called dd

var dd = {
  content: [
    {
      columns: [
        [
          {
            text: 'Eismo įvykio deklaracija',
            color: '#333333',
            width: '*',
            fontSize: 24,
            bold: true,
            alignment: 'center',
            margin: [0, 0, 0, 15],
          },
          {
            stack: [
              {
                columns: [
                  {
                    text: 'Laikas \n Plokštuma \n Ilguma \n Kaltininkas',
                    color: '#aaaaab',
                    bold: true,
                    width: '*',
                    fontSize: 12,
                    alignment: 'right',
                  },
                  {
                    text: '23:59 \n 54.7889456 \n 73.5648123 \n MIM323',
                    bold: true,
                    color: '#333333',
                    fontSize: 12,
                    alignment: 'right',
                    width: 100,
                  },
                ],
              },
            ],
          },
        ],
      ],
    },
    {
      columns: [
        {
          text: 'Pirmasis vairuotojas',
          color: '#aaaaab',
          bold: true,
          fontSize: 14,
          alignment: 'left',
          margin: [0, 20, 0, 5],
        },
        {
          text: 'Antrasis vairuotojas',
          color: '#aaaaab',
          bold: true,
          fontSize: 14,
          alignment: 'left',
          margin: [0, 20, 0, 5],
        },
      ],
    },
    {
      columns: [
        {
          text: 'Minvydas \n Staniulis \n 2000-03-23 \n  \n 123456 \n MIM323',
          bold: true,
          color: '#333333',
          alignment: 'left',
        },
        {
          text: 'Petras \n Petraitis \n 2000-03-21 \n  \n 123456 \n AAA111',
          bold: true,
          color: '#333333',
          alignment: 'left',
        },
      ],
    },
    {
      columns: [
        {
          text: 'Kontaktai',
          color: '#aaaaab',
          bold: true,
          margin: [0, 7, 0, 3],
        },
        {
          text: 'Kontaktai',
          color: '#aaaaab',
          bold: true,
          margin: [0, 7, 0, 3],
        },
      ],
    },
    {
      columns: [
        {
          text: '+37060079911 \n mimciks@gmail.com',
          style: 'invoiceBillingAddress',
        },
        {
          text: '+37060079911 \n mimciks@gmail.com',
          style: 'invoiceBillingAddress',
        },
      ],
    },
    {
      columns: [
        {
          text: 'Adresas',
          color: '#aaaaab',
          bold: true,
          margin: [0, 7, 0, 3],
        },
        {
          text: 'Adresas',
          color: '#aaaaab',
          bold: true,
          margin: [0, 7, 0, 3],
        },
      ],
    },
    {
      columns: [
        {
          text: '9999 Street name 1A \n Lietuva',
          style: 'invoiceBillingAddress',
        },
        {
          text: '1111 Other street 25 \n Lietuva',
          style: 'invoiceBillingAddress',
        },
      ],
    },
    '\n\n',
    {
      text: 'Duomenys',
      color: '#333333',
      width: '*',
      fontSize: 15,
      bold: true,
      alignment: 'center',
      margin: [0, 0, 0, 15],
    },
    {
      columns: [
        {
          text: 'Pirmojo vairuotojo aplinkybės',
          color: '#aaaaab',
          bold: true,
          fontSize: 14,
          alignment: 'left',
          margin: [0, 20, 0, 5],
        },
        {
          text: 'Antrojo vairuotojo aplinkybės',
          color: '#aaaaab',
          bold: true,
          fontSize: 14,
          alignment: 'left',
          margin: [0, 20, 0, 5],
        },
      ],
    },
    {
      columns: [
        {
          text: 'Pirminis smūgis: smugis \n įvykio dėtalės: žiedas \n',
          bold: true,
          color: '#333333',
          alignment: 'left',
        },
        {
          text: 'Pirminis smūgis: smugis \n įvykio dėtalės: žiedas \n',
          bold: true,
          color: '#333333',
          alignment: 'left',
        },
      ],
    },
    '\n\n\n\n',
    {
      image: '',
      width: 350,
      alignment: 'center',
    },
    {
      image: '',
      width: 350,
      alignment: 'center',
    },
    {
      image: '',
      width: 350,
      alignment: 'center',
    },
    {
      image: '',
      width: 350,
      alignment: 'center',
    },
    {
      image: '',
      width: 350,
      alignment: 'center',
    },
  ],
  styles: {
    notesTitle: {
      fontSize: 10,
      bold: true,
      margin: [0, 50, 0, 3],
    },
    notesText: {
      fontSize: 10,
    },
  },
  defaultStyle: {
    columnGap: 20,
    //font: 'Quicksand',
  },
};
