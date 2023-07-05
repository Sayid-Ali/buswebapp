import React from 'react';
import { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import { saveAs } from 'file-saver';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import * as XLSX from 'xlsx';
import { useDispatch } from "react-redux";
import { axiosInstance } from "../helpers/axiosIntance";
import { HideLoading, ShowLoading } from '../redux/alertsSlice';

const BusReports = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  console.log(data)

  useEffect(() => {
    // Fetch bus data from the server
    fetchBusData();
  }, []);

  const fetchBusData = async () => {
   
    try {
        dispatch(ShowLoading());
        const response = await axiosInstance.post(
          "http://localhost:5000/api/buses/get-all-buses",
          {}
        );
        dispatch(HideLoading());
        if (response.data.success) {
            const buses = response.data.data;
           // filter buses with bus.status = Completed
           const completedTrip = buses.filter((bus) => bus.status.includes('Completed')) 
          setData(completedTrip);
        } else {
          message.error(response.data.message);
        }
      } catch (error) {
        dispatch(HideLoading());
        message.error(error.message);
      }
  };



  

  const columns = [
    {
      title: 'Trip date',
      dataIndex: 'journeyDate',
      key: 'journeyDate',
    },
    {
      title: 'Number Plate',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Route',
      dataIndex: 'from',
      key: 'route',
      render: (from, record) => (
        <span>
          {from} to {record.to}
        </span>
      ),
    },
    {
      title: 'Capacity',
      dataIndex: 'capacity',
      key: 'capacity',
    },
    {
      title: 'Seats Booked',
      key: 'seatsBooked',
      render: (_, record) => `${record.seatsBooked.length}/${record.capacity}`,
    },
    {
      title: 'Fare',
      dataIndex: 'fare',
      key: 'fare',
    },
    // {
    //   title: 'Expenses',
    //   dataIndex: 'expenses',
    //   key: 'expenses',
    // },
    {
        title: 'Expected Revenue',
        key: 'expectedRevenue',
        render: (_, record) => {
          const expectedRevenue = record.capacity * record.fare;
          return <span>{expectedRevenue}</span>;
        },
      },
    {
      title: 'Total Revenue',
      key: 'totalRevenue',
      render: (_, record) => {
        const totalRevenue = record.seatsBooked.length * record.fare;
        return <span>{totalRevenue}</span>;
      },
    },
    {
      title: 'Profit/Loss',
      key: 'profitLoss',
      render: (_, record) => {
        const expectedRevenue = record.capacity * record.fare;
        const totalRevenue = record.seatsBooked.length * record.fare;
        const profitLoss = totalRevenue - expectedRevenue;
        const color = profitLoss >= 0 ? 'green' : 'red';
        return <span style={{ color }}>{profitLoss}</span>;
      },
    },
    {
      title: 'Revenue Achievement',
      key: 'revenueAchievement',
      render: (_, record) => {
        const expectedRevenue = record.capacity * record.fare;
        const totalRevenue = record.seatsBooked.length * record.fare;
        const revenuePercentage = (totalRevenue / expectedRevenue) * 100;
        return (
          <span>
            {revenuePercentage.toFixed(2)}%
          </span>
        );
      },
    },
  ];



  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Bus Reports');
    const excelBlob = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const fileBuffer = new Blob([excelBlob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(fileBuffer, 'bus_reports.xlsx');
  };


// Custom table component compatible with @react-pdf/renderer
const CustomTable = ({ data }) => (
    <View style={styles.table}>
      {/* Table headers */}
      <View style={styles.tableRow}>
        <Text style={styles.tableHeader}>Trip Date</Text>
        <Text style={styles.tableHeader}>Number</Text>
        <Text style={styles.tableHeader}>Route</Text>
        {/* <Text style={styles.tableHeader}>Capacity</Text> */}
        <Text style={styles.tableHeader}>Booked</Text>
        <Text style={styles.tableHeader}>Fare</Text>
        {/* <Text style={styles.tableHeader}>Expenses</Text> */}
        <Text style={styles.tableHeader}>Expected Rev</Text>
        <Text style={styles.tableHeader}>Actual Rev</Text>
        <Text style={styles.tableHeader}>Profit/Loss</Text>
        <Text style={styles.tableHeader}>Rev %</Text>
      </View>
      {/* Table rows */}
      {data.map((item) => (
        <View key={item.id} style={styles.tableRow}>
          <Text style={styles.tableCell}>{item.journeyDate}</Text>
          <Text style={styles.tableCell}>{item.number}</Text>
          <Text style={styles.tableCell}>{`${item.from} to ${item.to}`}</Text>
          {/* <Text style={styles.tableCell}>{item.capacity}</Text> */}
          <Text style={styles.tableCell}>{`${item.seatsBooked.length}/${item.capacity}`}</Text>
          <Text style={styles.tableCell}>{item.fare}</Text>
          {/* <Text style={styles.tableCell}</Text> */}
          <Text style={styles.tableCell}>
            {item.capacity * item.fare}
          </Text>
          <Text style={styles.tableCell}>
            {item.seatsBooked.length * item.fare}
          </Text>
          <Text style={styles.tableCell}>
            {item.seatsBooked.length * item.fare - item.capacity * item.fare}
          </Text>
          <Text style={styles.tableCell}>
            {(((item.seatsBooked.length * item.fare) / (item.capacity * item.fare)) * 100).toFixed(1)}
          </Text>
        </View>
      ))}
    </View>
  );
  
  
  const styles = StyleSheet.create({
    container: {
    padding: 3,
    width: '100%',
    },
    title: {
      fontSize: 24,
      marginBottom: 10,
      textAlign: 'center',
      backgroundColor: 'green',
      color: 'white',
    },
    date: {
        fontSize: 12,
        marginBottom: 10,
        textAlign: 'center',
        color: 'grey',
        },
    table: {
      display: 'table',
      width: '100%',
      marginBottom: 10,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#CCCCCC',
    },
    tableRow: {
      flexDirection: 'row',
    },
    tableHeader: {
      backgroundColor: '#f2f2f2',
      padding: 5,
      fontSize: 10,
      fontWeight: 'bold',
      flex: 1,
      textAlign: 'center',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#CCCCCC',
    },
    tableCell: {
      padding: 5,
      fontSize: 8,
      flex: 1,
      textAlign: 'center',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#CCCCCC',
    },
  });
  
  
  const generatePDF = () => {
    const MyDoc = () => (
      <Document>
        <Page size="A4">
          {/* Define your PDF content here */}
          <View style={styles.container}>
            <Text style={styles.title}>Mumtaz Bus Reports</Text>
           {/* add date and time printed */}
           <Text style={styles.date}>Date Printed: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</Text>
            
            <CustomTable data={data} />
          </View>
        </Page>
      </Document>
    );

    return (
      <PDFDownloadLink document={<MyDoc />} fileName="bus_reports.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Generating PDF...' : <button className='primary-btn' type="primary">Download as PDF</button>
        }
      </PDFDownloadLink>
    );
  };

  return (
    <div>
        <h3>Completed Trips Report</h3>
      <div style={{ marginBottom: '1rem' }}>
        {generatePDF()}
        <button type="primary" className='primary-btn' onClick={handleDownloadExcel} style={{ marginLeft: '1rem' }}>
          Download as Excel
        </button>
      </div>
      <Table dataSource={data} columns={columns} rowKey="id" />
      
    </div>
  );
};

export default BusReports;
