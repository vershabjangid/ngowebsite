import React, { useState } from 'react'
import { Chart as Chartjs } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2';

export function UsersChart(props) {
    let daysCount = {
        Sunday: 0,
        Monday: 0,
        Tuesday: 0,
        Wednesday: 0,
        Thursday: 0,
        Friday: 0,
        Saturday: 0
    };
    let value = props.value

    // reset on day 
    function getstartonweek() {
        let today = new Date()
        let day = today.getDay()
        let diff = today.getDate() - day
        return new Date(today.setDate(diff));
    }

    let startOfWeek = getstartonweek()

    let weeklyusers = value.filter(user => new Date(Number(user.CreatedOn)) >= startOfWeek)
    weeklyusers.forEach((items) => {
        let dayindex = new Date(Number(items.CreatedOn)).getDay();
        const dayNames = Object.keys(daysCount);
        const dayName = dayNames[dayindex];
        daysCount[dayName] += 1;
    })
    const data = {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [
            {
                label: 'Users this week',
                data: [daysCount.Sunday, daysCount.Monday, daysCount.Tuesday, daysCount.Wednesday, daysCount.Thursday, daysCount.Friday, daysCount.Saturday],
                backgroundColor: ['#00000', '#ff9d9d', '#fdff9d', '#9dddff', '#bc9dff', '#ffd89d', '#f59dff'],
            },
        ],
    };
    return (
        <div className='w-[100%] h-[320px] bg-[white] p-2 rounded-[20px]'>
            <Bar data={data} className='w-[100%]'/>
        </div>
    )
}