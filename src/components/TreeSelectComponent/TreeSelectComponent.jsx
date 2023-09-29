import React, { useState } from 'react';
import { TreeSelect } from 'antd';
import './style.css'
import Data from './../../Api/TreeData.json'
import { useDispatch } from 'react-redux';
import { SET_ACTIVE_AREA } from '../../Api/slice';
// const treeData = [
//     {
//         value: 'L.B.Nagar',
//         title: 'L.B.Nagar East Zone',
//         children: [
//             {
//                 value: 'Kapra Circle',
//                 title: 'Kapra',
//                 children: [
//                     {
//                         value: 'Ward1',
//                         title: 'Kapra',
//                     },
//                     {
//                         value: 'Ward2',
//                         title: 'Dr AS Rao Nagar',
//                     },
//                     {
//                         value: 'Ward3',
//                         title: 'Cherlapally',
//                     },
//                     {
//                         value: 'Ward4',
//                         title: 'Meerpet HB Colony',
//                     },
//                     {
//                         value: 'Ward5',
//                         title: 'Mallapur',
//                     },
//                     {
//                         value: 'Ward6',
//                         title: 'Nacharam',
//                     },
//                 ],
//             },
//             {
//                 value: 'Uppal Circle',
//                 title: 'Uppal',
//                 children: [
//                     {
//                         value: 'Ward7',
//                         title: 'Chilukanagar',
//                     },
//                     {
//                         value: 'Ward8',
//                         title: 'Habsiguda',
//                     },
//                     {
//                         value: 'Ward9',
//                         title: 'Ramanthapur',
//                     },
//                     {
//                         value: 'Ward10',
//                         title: 'Uppal',
//                     },

//                 ],
//             },
//             {
//                 value: 'Hayathnagar Circle',
//                 title: 'Hayathnagar',
//                 children: [
//                     {
//                         value: 'Ward11',
//                         title: 'Nagole',
//                     },
//                     {
//                         value: 'Ward12',
//                         title: 'Mansoorabad',
//                     },
//                     {
//                         value: 'Ward13',
//                         title: 'Hayathnagar',
//                     },
//                     {
//                         value: 'Ward14',
//                         title: 'B.N.Reddy',
//                     },

//                 ],
//             },
//             {
//                 value: 'LB Nagar Circle',
//                 title: 'LB Nagar',
//                 children: [
//                     {
//                         value: 'Ward15',
//                         title: 'Vanasthalipuram',
//                     },
//                     {
//                         value: 'Ward16',
//                         title: 'Hastinapuram',
//                     },
//                     {
//                         value: 'Ward17',
//                         title: 'Champapet',
//                     },
//                     {
//                         value: 'Ward18',
//                         title: 'Lingojiguda',
//                     },

//                 ],
//             },
//             {
//                 value: 'Saroornagar Circle',
//                 title: 'Saroornagar',
//                 children: [
//                     {
//                         title: ' Saroornagar',
//                         value: 'Ward19',
//                     },
//                     {
//                         value: 'Ward20',
//                         title: 'Rama Krishna Puram',
//                     },
//                     {
//                         value: 'Ward21',
//                         title: 'Kothapet',
//                     },
//                     {
//                         value: 'Ward22',
//                         title: 'Chaitanyapuri',
//                     },
//                     {
//                         value: 'Ward23',
//                         title: 'Gaddiannaram',
//                     }

//                 ],
//             },

//         ],
//     },


//     {
//         value: 'Charminar',
//         title: 'Charminar South Zone',
//         children: [
//             {
//                 value: 'Malakpet Circle',
//                 title: 'Malakpet',
//                 children: [
//                     {
//                         value: 'Ward24',
//                         title: 'Saidabad',
//                     },
//                     {
//                         value: 'Ward25',
//                         title: 'Moosrambagh',
//                     },
//                     {
//                         value: 'Ward26',
//                         title: 'Old Malakpet',
//                     },
//                     {
//                         value: 'Ward27',
//                         title: 'Akberbagh',
//                     },
//                     {
//                         value: 'Ward28',
//                         title: 'Azampura',
//                     },
//                     {
//                         value: 'Ward29',
//                         title: 'Chawani',
//                     },
//                     {
//                         value: 'Ward30',
//                         title: 'Dabeerpura',
//                     },
//                 ],
//             },
//             {
//                 value: 'Santoshnagar Circle',
//                 title: 'Santoshnagar',
//                 children: [
//                     {
//                         value: 'Ward31',
//                         title: 'Rein Bazar',
//                     },
//                     {
//                         value: 'Ward34',
//                         title: 'Talabchanchalam',
//                     },
//                     {
//                         value: 'Ward35',
//                         title: 'Gowlipura',
//                     },
//                     {
//                         value: 'Ward37',
//                         title: 'Kurmaguda',
//                     },
//                     {
//                         value: 'Ward38',
//                         title: 'IS SADAN',
//                     },
//                     {
//                         value: 'Ward39',
//                         title: 'Santosh Nagar',
//                     },

//                 ],
//             },
//             {
//                 value: 'Chandrayangutta Circle',
//                 title: 'Chandrayangutta',
//                 children: [
//                     {
//                         value: 'Ward36',
//                         title: 'Lalithbagh',
//                     },
//                     {
//                         value: 'Ward40',
//                         title: 'Riyasath Nagar',
//                     },
//                     {
//                         value: 'Ward41',
//                         title: 'Kanchanbagh',
//                     },
//                     {
//                         value: 'Ward42',
//                         title: 'Barkas',
//                     },
//                     {
//                         value: 'Ward43',
//                         title: 'Chandrayangutta',
//                     },
//                     {
//                         value: 'Ward44',
//                         title: 'Uppuguda',
//                     },
//                     {
//                         value: 'Ward45',
//                         title: 'Jangammet',
//                     },

//                 ],
//             },
//             {
//                 value: 'Charminar Circle',
//                 title: 'Charminar',
//                 children: [
//                     {
//                         value: 'Ward32',
//                         title: 'Pathergatti',
//                     },
//                     {
//                         value: 'Ward33',
//                         title: 'Moghalpura',
//                     },
//                     {
//                         value: 'Ward48',
//                         title: 'Shalibanda',
//                     },
//                     {
//                         value: 'Ward49',
//                         title: 'Ghansi Bazar',
//                     },
//                     {
//                         value: 'Ward52',
//                         title: 'Puranapul',
//                     },

//                 ],
//             },
//             {
//                 value: 'Falaknuma Circle',
//                 title: 'Falaknuma',
//                 children: [
//                     {
//                         value: 'Ward46',
//                         title: 'Falaknuma',
//                     },
//                     {
//                         value: 'Ward47',
//                         title: 'Nawab Saheb Kunta',
//                     },
//                     {
//                         value: 'Ward53',
//                         title: 'Doodbowli',
//                     },
//                     {
//                         value: 'Ward54',
//                         title: 'Jahanuma',
//                     },
//                     {
//                         value: 'Ward55',
//                         title: 'Ramnaspura',
//                     },
//                     {
//                         value: 'Ward56',
//                         title: 'Kishanbagh',
//                     }

//                 ],
//             },
//             {
//                 value: 'Rajendra Nagar',
//                 title: 'Rajendra Nagar',
//                 children: [
//                     {
//                         value: 'Ward60',
//                         title: 'Rajendra Nagar',
//                     },
//                     {
//                         value: 'Ward61',
//                         title: 'Attapur',
//                     },
//                     {
//                         value: 'Ward57',
//                         title: 'Suleman Nagar',
//                     },
//                     {
//                         value: 'Ward58',
//                         title: 'Shastri puram',
//                     },
//                     {
//                         value: 'Ward59',
//                         title: 'Mailardevpally',
//                     },
//                 ],
//             },

//         ],
//     },
//     {
//         value: 'Khairatabad ',
//         title: 'Khairatabad Central Zone',
//         children: [
//             {
//                 value: 'Mehdipatnam Circle',
//                 title: 'Mehdipatnam',
//                 children: [
//                     {
//                         value: 'Ward70',
//                         title: 'Mehdipatnam',
//                     },
//                     {
//                         value: 'Ward71',
//                         title: 'Gudimalkapur',
//                     },
//                     {
//                         value: 'Ward72',
//                         title: 'Asif Nagar',
//                     },
//                     {
//                         value: 'Ward73',
//                         title: 'Vijayanagar Colony',
//                     },
//                     {
//                         value: 'Ward74',
//                         title: 'Ahmed Nagar',
//                     },
//                     {
//                         value: 'Ward75',
//                         title: 'Red Hills',
//                     },
//                     {
//                         value: 'Ward76',
//                         title: 'Mallepally',
//                     },
//                 ],
//             },
//             {
//                 value: 'Karwan Circle',
//                 title: 'Karwan',
//                 children: [
//                     {
//                         value: 'Ward62',
//                         title: 'Ziaguda',
//                     },
//                     {
//                         value: 'Ward65',
//                         title: 'Karwan',
//                     },
//                     {
//                         value: 'Ward66',
//                         title: 'Langer House',
//                     },
//                     {
//                         value: 'Ward67',
//                         title: 'Golconda',
//                     },
//                     {
//                         value: 'Ward68',
//                         title: 'Tolichowki',
//                     },
//                     {
//                         value: 'Ward69',
//                         title: 'Nanalnagar',
//                     },

//                 ],
//             },
//             {
//                 value: 'Goshamahal Circle',
//                 title: 'Goshamahal',
//                 children: [
//                     {
//                         value: 'Ward50',
//                         title: 'Begum Bazar',
//                     },
//                     {
//                         value: 'Ward51',
//                         title: 'Gosha Mahal',
//                     },
//                     {
//                         value: 'Ward63',
//                         title: 'Manghalhat',
//                     },
//                     {
//                         value: 'Ward64',
//                         title: 'Dattathreyanagar',
//                     },
//                     {
//                         value: 'Ward77',
//                         title: 'Jambagh(Nampally)',
//                     },
//                     {
//                         value: 'Ward78',
//                         title: 'Gunfoundry',
//                     },

//                 ],
//             },
//             {
//                 value: 'Khairatabad Circle',
//                 title: 'Khairatabad',
//                 children: [
//                     {
//                         value: 'Ward91',
//                         title: 'Khairtabad',
//                     },
//                     {
//                         value: 'Ward97',
//                         title: 'Somajiguda',
//                     },
//                     {
//                         value: 'Ward98',
//                         title: 'Ameerpet',
//                     },
//                     {
//                         value: 'Ward100',
//                         title: 'Sanathnagar',
//                     },
//                 ],
//             },
//             {
//                 value: 'Jubilee Hills',
//                 title: 'Jubilee Hills',
//                 children: [
//                     {
//                         value: 'Ward92',
//                         title: 'Venkateshwara Colony',
//                     },
//                     {
//                         value: 'Ward93',
//                         title: 'Banjara Hills',
//                     },
//                     {
//                         value: 'Ward94',
//                         title: 'Shaikpet',
//                     },
//                     {
//                         value: 'Ward95',
//                         title: 'Jubilee Hills',
//                     },

//                 ],
//             },

//         ],
//     },

//     {
//         value: 'Secunderabad',
//         title: 'Secunderabad North Zone',
//         children: [
//             {
//                 value: 'Amberpet',
//                 title: 'Amberpet',
//                 children: [

//                     {
//                         value: 'Ward79',
//                         title: 'Himayathnagar',
//                     },
//                     {
//                         value: 'Ward80',
//                         title: 'Kachiguda Barkatpura',
//                     },
//                     {
//                         value: 'Ward81',
//                         title: 'Nallakunta',
//                     },
//                     {
//                         value: 'Ward82',
//                         title: 'Golnaka',
//                     },
//                     {
//                         value: 'Ward83',
//                         title: 'Amberpet',
//                     },
//                     {
//                         value: 'Ward84',
//                         title: 'Bagh Amberpet',
//                     },

//                 ],
//             },
//             {
//                 value: 'Musheerabad Circle',
//                 title: 'Musheerabad',
//                 children: [
//                     {
//                         value: 'Ward85',
//                         title: 'Adikmet',
//                     },
//                     {
//                         value: 'Ward86',
//                         title: 'Musheerabad',
//                     },
//                     {
//                         value: 'Ward87',
//                         title: 'Ramnagar',
//                     },
//                     {
//                         value: 'Ward88',
//                         title: 'Bholakpur',
//                     },
//                     {
//                         value: 'Ward89',
//                         title: 'Gandhinagar',
//                     },
//                     {
//                         value: 'Ward90',
//                         title: 'Kavadiguda',
//                     },

//                 ],
//             },
//             {
//                 value: 'Malkajgiri Circle',
//                 title: 'Malkajgiri',
//                 children: [
//                     {
//                         value: 'Ward136',
//                         title: 'Neredmet',
//                     },
//                     {
//                         value: 'Ward137',
//                         title: 'Vinayak Nagar',
//                     },
//                     {
//                         value: 'Ward138',
//                         title: 'Moula-Ali',
//                     },
//                     {
//                         value: 'Ward139',
//                         title: 'East Anandbagh',
//                     },
//                     {
//                         value: 'Ward140',
//                         title: 'Malkajgiri ',
//                     },
//                     {
//                         value: 'Ward141',
//                         title: 'Gautham Nagar',
//                     },

//                 ],
//             },
//             {
//                 value: 'Secunderabad Circle',
//                 title: 'Secunderabad',
//                 children: [
//                     {
//                         value: 'Ward142',
//                         title: 'Addagutta',
//                     },
//                     {
//                         value: 'Ward143',
//                         title: 'Tarnaka',
//                     },
//                     {
//                         value: 'Ward144',
//                         title: 'Mettuguda',
//                     },
//                     {
//                         value: 'Ward145',
//                         title: 'Sitaphalmandi',
//                     },
//                     {
//                         value: 'Ward146',
//                         title: 'Boudha Nagar',
//                     },
//                 ],
//             },
//             {
//                 value: 'Begumpet Circle',
//                 title: 'Begumpet',
//                 children: [
//                     {
//                         value: 'Ward147',
//                         title: 'Bansilalpet',
//                     },
//                     {
//                         value: 'Ward148',
//                         title: 'Ramgopal Pet',
//                     },
//                     {
//                         value: 'Ward149',
//                         title: 'Begumpet',
//                     },
//                     {
//                         value: 'Ward150',
//                         title: 'Monda Market',
//                     }
//                 ],
//             },
//         ],
//     },
//     {
//         value: 'Serilingampally',
//         title: 'Serilingampally West Zone',
//         children: [
//             {
//                 value: 'Yousufguda Circle',
//                 title: 'Yousufguda',
//                 children: [
//                     {
//                         value: 'Ward96',
//                         title: 'Yousufguda',
//                     },
//                     {
//                         value: 'Ward99',
//                         title: 'Vengal Rao Nagar',
//                     },
//                     {
//                         value: 'Ward101',
//                         title: 'Erragadda',
//                     },
//                     {
//                         value: 'Ward102',
//                         title: 'Rahamath Nagar',
//                     },
//                     {
//                         value: 'Ward103',
//                         title: 'Borabanda',
//                     },
//                 ],
//             },
//             {
//                 value: 'Serilingampally Circle',
//                 title: 'Serilingampally',
//                 children: [
//                     {
//                         value: 'Ward104',
//                         title: 'Kondapur',
//                     },
//                     {
//                         value: 'Ward105',
//                         title: 'Gachibowli',
//                     },

//                     {
//                         value: 'Ward106',
//                         title: 'Serilingampally',
//                     },
//                     {
//                         value: 'Bharathinagar(P)',
//                         title: 'Bharathinagar(P)',
//                     },
//                 ],
//             },
//             {
//                 value: 'Chandanagar Circle',
//                 title: 'Chandanagar',
//                 children: [
//                     {
//                         value: 'Ward107',
//                         title: 'Madhapur',
//                     },
//                     {
//                         value: 'Ward108',
//                         title: 'Miyapur',
//                     },
//                     {
//                         value: 'Ward109',
//                         title: 'Hafeezpet',
//                     },
//                     {
//                         value: 'Ward110',
//                         title: 'Chandanagar',
//                     },
//                 ],
//             },
//             {
//                 value: 'Ramachandrapuram / Patancheru',
//                 title: 'Ramachandrapuram / Patancheru',
//                 children: [
//                     {
//                         value: 'Ward111',
//                         title: 'Bharathinagar(P)',
//                     },
//                     {
//                         value: 'Ward112',
//                         title: 'Ramachandrapuram',
//                     },
//                     {
//                         value: 'Ward113',
//                         title: 'Patancheruvu',
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         value: 'Kukatpally',
//         title: 'Kukatpally West Zone',
//         children: [
//             {
//                 value: 'Moosapet Circle',
//                 title: 'Moosapet',
//                 children: [
//                     {
//                         value: 'Ward114',
//                         title: 'KPHB Colony',
//                         cordinate: [['78', '18']]
//                     },
//                     {
//                         value: 'Ward115',
//                         title: 'Balajinagar',
//                     },
//                     {
//                         value: 'Ward116',
//                         title: 'Allapur',
//                     },
//                     {
//                         value: 'Ward117',
//                         title: 'Moosapet',
//                     },
//                     {
//                         value: 'Ward118',
//                         title: 'Fathe Nagar',
//                     },
//                 ],
//             },
//             {
//                 value: 'Kukatpally Circle',
//                 title: 'Kukatpally Circle',
//                 children: [
//                     {
//                         value: 'Ward119',
//                         title: 'Old Bowenpally',
//                     },
//                     {
//                         value: 'Ward120',
//                         title: 'Balanagar',
//                     },

//                     {
//                         value: 'Ward121',
//                         title: 'Kukatpally',
//                     },
//                     {
//                         value: 'Ward122',
//                         title: 'Vivekananda Nagar Colony',
//                     },
//                     {
//                         value: 'Ward123',
//                         title: 'Hydernagar',
//                     },
//                     {
//                         value: 'Ward124',
//                         title: 'Allwyn Colony',
//                     },
//                 ],
//             },
//             {
//                 value: 'Quthbullapur Circle',
//                 title: 'Quthbullapur',
//                 children: [
//                     {
//                         value: 'Ward127',
//                         title: 'Rangareddy nagar',
//                     },
//                     {
//                         value: 'Ward130',
//                         title: 'Subhashnagar',
//                     },
//                     {
//                         value: 'Ward131',
//                         title: 'Qutbullapur',
//                     },
//                     {
//                         value: 'Ward132',
//                         title: 'Jeedimetla',
//                     },
//                 ],
//             },
//             {
//                 value: 'Gajula Ramaram Circle',
//                 title: 'Gajula Ramaram',
//                 children: [
//                     {
//                         value: 'Ward125',
//                         title: 'Gajula Ramaram',
//                     },
//                     {
//                         value: 'Ward126',
//                         title: 'Jagadgirigutta',
//                     },
//                     {
//                         value: 'Ward128',
//                         title: 'Chintal',
//                     },
//                     {
//                         value: 'Ward129',
//                         title: 'Suraram',
//                     },
//                 ],
//             },
//             {
//                 value: 'Alwal Circle',
//                 title: 'Alwal',
//                 children: [
//                     {
//                         value: 'Ward133',
//                         title: 'Macha Bollaram',
//                     },
//                     {
//                         value: 'Ward134',
//                         title: 'Alwal',
//                     },
//                     {
//                         value: 'Ward135',
//                         title: 'Venkatapuram',
//                     },
//                 ],
//             },
//         ],
//     },

// ];
const treeData = Data
// Now, 'treeData' contains two parent nodes: 'parent 1' and 'parent 2'.

const TreeSelectComponent = () => {
    const [value, setValue] = useState();
    const dispatch = useDispatch();

    const onChange = (newValue) => {
        setValue(newValue);
        dispatch(SET_ACTIVE_AREA(newValue));
    };

    const onClear = () => {
        setValue(null); // Set the value to null when cleared
        dispatch(SET_ACTIVE_AREA(null)); // Optionally dispatch an action to reset the active area in your Redux store
    };
    return (
        <div className='tree_container'>
            <TreeSelect
                showSearch
                style={{ width: '100%', height: '40px' }}
                value={value}
                dropdownStyle={{ maxHeight: '500px', overflow: 'auto' }}
                placeholder="Please select"
                allowClear
                treeDefaultExpandAll
                onChange={onChange}
                onClear={onClear} // Add the onClear handler
                treeData={treeData}
            />
        </div>
    );
};


export default TreeSelectComponent;