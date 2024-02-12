import { useEffect, useRef, useState } from 'react';
import { Box, CircularProgress, Pagination, Typography } from '@mui/material';
import { FilterValuesType, MealsType, SavedMealType } from '../../utils/types';
import {
  createMeal,
  deleteMeal,
  getMeals,
  updateMeal,
} from '../../utils/fetchData';
import SavedMealsList from './SavedMealsList';
import AddMealForm from './AddMealForm';
import MealFilter from './MealFilter';

import { useAuth } from '../AuthProvider';

const MealsManager = () => {
  const { isAuthenticated } = useAuth();
  const [mealsData, setMealsData] = useState<MealsType>({
    totalPages: 0,
    currentPage: 1,
    meals: [],
  });

  const [loading, setLoading] = useState<boolean>(true);

  const limit = 5;

  const initialFilters = {
    typeFilter: '',
    titleFilter: '',
    isFavoriteFilter: undefined,
  };
  const [filters, setFilters] = useState(initialFilters);
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [showDelayedMessage, setShowDelayedMessage] = useState(false);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    if (loading) {
      timeoutIdRef.current = setTimeout(() => {
        setShowDelayedMessage(true);
      }, 3000);
    } else {
      setShowDelayedMessage(false);
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    }
  }, [loading]);
  
  useEffect(() => {
    if (isAuthenticated) {
      getMeals(
        filters.typeFilter,
        filters.titleFilter,
        filters.isFavoriteFilter,
        mealsData.currentPage,
        limit
      )
        .then((response) => {
          setMealsData({
            ...mealsData,
            meals: response.meals,
            totalPages: response.totalPages,
            currentPage: response.currentPage,
          });
        })
        .finally(() => {
          setLoading(false);
        })
        .catch((error) => {
          const message =
            error.response?.data?.msg ||
            'Failed to load meals. Please try again.';
          setErrorMessage(message);
        });
    }
  }, [mealsData.currentPage, filters, isAuthenticated, filters]);

  const handleCreateMeal = (meal: SavedMealType) => {
    createMeal(meal)
      .then((response) => {
        const newMeal = response.data.meal;
        setMealsData({
          ...mealsData,
          meals: [...mealsData.meals, newMeal],
        });
      })
      .catch((error) => {
        const messages = error.response?.data?.msg
          .split(',')
          .map((msg: string) => msg.trim() + '.');
        setErrorMessage(messages || ['An unexpected error occurred.']);
      });
  };


  const handleDeleteMeal = (mealId: string | undefined) => {
    if (!mealId) {
      return;
    }
    setLoading(true);
    deleteMeal(mealId)
      .then(() => {
        getMeals(
          filters.typeFilter,
          filters.titleFilter,
          filters.isFavoriteFilter,
          mealsData.currentPage,
          limit
        )
        .then((response) => {
          const isNewPageEmpty = response.meals.length === 0;
          const shouldAdjustPage = mealsData.currentPage > 1 && isNewPageEmpty;
      
          setMealsData({
            meals: response.meals,
            totalPages: response.totalPages,
            currentPage: shouldAdjustPage ? mealsData.currentPage - 1 : mealsData.currentPage,
          });
        })
      })
      .catch((error) => {
        const message = error.response?.data?.msg || 'Deleting the meal failed. Please try again.';
        setErrorMessage([message]);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  const handleUpdateMeal = (mealId: string, updatedMeal: SavedMealType) => {
    if (!mealId) {
      return;
    }
    updateMeal(mealId, updatedMeal)
      .then((response) => {
        const updatedMealIndex = mealsData.meals.findIndex(
          (meal) => meal._id === mealId
        );
        const updatedMeals = [...mealsData.meals];
        updatedMeals[updatedMealIndex] = response.data.meal;
        setMealsData({
          ...mealsData,
          meals: updatedMeals,
        });
      })
      .catch((error) => {
        const message =
          error.response?.data?.msg ||
          'Updating the meal failed. Please try again.';
        setErrorMessage(message);
      });
  };

  const handlePageChange = (_: unknown, value: number) => {
    setMealsData({ ...mealsData, currentPage: value });
  };

  const handleFilterSubmit = (filterValues: FilterValuesType) => {
    setFilters({
      typeFilter: filterValues.typeFilter || '',
      titleFilter: filterValues.titleFilter || '',
      isFavoriteFilter: filterValues.isFavoriteFilter,
    });
    setMealsData({ ...mealsData, currentPage: 1 });
  };

  const handleResetFilters = () => {
    setFilters({ ...initialFilters });
    getMeals(
      initialFilters.typeFilter,
      initialFilters.titleFilter,
      initialFilters.isFavoriteFilter,
      1,
      limit
    )
      .then((response) => {
        setMealsData({
          meals: response.meals,
          totalPages: response.totalPages,
          currentPage: 1,
        });
      })
      .catch((error) => {
        const message =
          error.response?.data?.msg ||
          'Failed to reset filters meals. Please try again.';
        setErrorMessage(message);
      });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        width: '100vw',
        minHeight: '100vh',
        flexGrow: 1,
      }}
    >
      <MealFilter
        onFilterSubmit={handleFilterSubmit}
        onResetFilters={handleResetFilters}
      />
      <Typography variant="h3" component="h3" style={{ letterSpacing: '2px' }}>
        My Meals Options
      </Typography>
      <AddMealForm
        onCreateMeal={handleCreateMeal}
        errorMessage={errorMessage}
      />
      <SavedMealsList
        meals={mealsData.meals}
        onDeleteMeal={handleDeleteMeal}
        onUpdateMeal={handleUpdateMeal}
      />
      {loading && showDelayedMessage &&(
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <CircularProgress />
        <Typography variant="body1" component="p" sx={{ color: (theme) => theme.palette.text.primary, opacity: 0.5, fontSize: '0.8rem' }}>
          Loading meals may take a while as the web service is deployed in Frankfurt.
        </Typography>
      </Box>
      )}
      <Pagination
        count={mealsData.totalPages}
        page={mealsData.currentPage}
        onChange={handlePageChange}
      />
    </Box>
  );
};

export default MealsManager;
