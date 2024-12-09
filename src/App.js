import React, { useState } from 'react';
import Calendar from 'react-calendar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import 'react-calendar/dist/Calendar.css';
import NavBar from './NavBar';
import MealTracker from './MealTracker';
import DailySummary from './DailySummary';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('meals');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [nutritionData, setNutritionData] = useState({});

  const [meals, setMeals] = useState([
    {
      id: 1, 
      name: "Breakfast", 
      icon: 'Coffee',
      foods: [
        { name: "Oatmeal", calories: 150, protein: 6, carbs: 27, fat: 3 },
        { name: "Banana", calories: 105, protein: 1, carbs: 27, fat: 0 }
      ]
    },
    { 
      id: 2, 
      name: "Lunch", 
      icon: 'Sun',
      foods: [
        { name: "Chicken Salad", calories: 350, protein: 25, carbs: 10, fat: 12 }
      ]
    },
    { 
      id: 3, 
      name: "Dinner", 
      icon: 'Moon',
      foods: [
        { name: "Grilled Salmon", calories: 400, protein: 30, carbs: 0, fat: 15 }
      ]
    }
  ]);

  // Calculate daily totals
  const getDailyTotals = (mealData) => {
    return mealData.reduce((acc, meal) => {
      const mealTotals = meal.foods.reduce((foodAcc, food) => ({
        calories: Number(foodAcc.calories) + Number(food.calories),
        protein: Number(foodAcc.protein) + Number(food.protein),
        carbs: Number(foodAcc.carbs) + Number(food.carbs),
        fat: Number(foodAcc.fat) + Number(food.fat)
      }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

      return {
        calories: acc.calories + mealTotals.calories,
        protein: acc.protein + mealTotals.protein,
        carbs: acc.carbs + mealTotals.carbs,
        fat: acc.fat + mealTotals.fat
      };
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  const addFood = (mealId, newFood) => {
    const updatedMeals = meals.map(meal => {
      if (meal.id === mealId) {
        return {
          ...meal,
          foods: [...meal.foods, { 
            ...newFood, 
            calories: Number(newFood.calories),
            protein: Number(newFood.protein),
            carbs: Number(newFood.carbs),
            fat: Number(newFood.fat)
          }]
        };
      }
      return meal;
    });
    
    setMeals(updatedMeals);

    const dateKey = selectedDate.toDateString();
    setNutritionData(prevData => ({
      ...prevData,
      [dateKey]: updatedMeals
    }));
  };

  const removeFood = (mealId, foodName) => {
    const updatedMeals = meals.map(meal => {
      if (meal.id === mealId) {
        return {
          ...meal,
          foods: meal.foods.filter(food => food.name !== foodName)
        };
      }
      return meal;
    });
    
    setMeals(updatedMeals);

    const dateKey = selectedDate.toDateString();
    setNutritionData(prevData => ({
      ...prevData,
      [dateKey]: updatedMeals
    }));
  };


  return (
    <Router> {/* Wrap the app with Router */}
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />

       {/* Calendar */}
       <div className="d-flex justify-content-center mb-4">
          <Calendar
            value={selectedDate}
            onChange={setSelectedDate}
          />
        </div>
      
      <div className="container">
        {/* Use Routes for handling different paths */}
        <Routes>
          <Route 
            path="/" 
            element={
              <MealTracker 
                meals={meals} 
                addFood={addFood} 
                removeFood={removeFood} 
                getDailyTotals={getDailyTotals} 
              />
            } 
          />
          
          <Route 
            path="/summary" 
            element={
              <DailySummary 
                nutritionData={nutritionData} 
                getDailyTotals={getDailyTotals} 
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
