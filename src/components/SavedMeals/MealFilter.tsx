import { useState, MouseEvent } from 'react';
import { Button, Menu, MenuItem, TextField, FormControlLabel, Switch, Select, InputLabel, FormControl } from '@mui/material';
import { FilterValuesType} from '../../utils/types';


type MealFilterProps = {
    onFilterSubmit: (filterValues: FilterValuesType) => void;
    onResetFilters: () => void;
};

const MealFilter = ({ onFilterSubmit, onResetFilters }: MealFilterProps) => {
    const [filterMenuToggle, setFilterMenuToggle] = useState<null | HTMLElement>(null);
    const [titleFilter, setTitleFilter] = useState<string>('');
    const [isFavoriteFilter, setIsFavoriteFilter] = useState<boolean>(false);
    const [typeFilter, setTypeFilter] = useState<string>('');

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setFilterMenuToggle(event.currentTarget);
    };

    const handleClose = () => {
        setFilterMenuToggle(null);
    };

    const handleSubmit = () => {
        onFilterSubmit({
            typeFilter,
            titleFilter,
            isFavoriteFilter
        });
        handleClose();
    };
    

    const handleReset = () => {
        onResetFilters();
        handleClose();
    };
    return (
        <div style={{ position: 'relative' }}>
            <Button 
                variant="contained" 
                aria-controls="simple-menu" 
                aria-haspopup="true" 
                onClick={handleClick} 
                style={{ 
                    borderRadius: '8px', 
                    margin: '40px 0 20px 0', 
                    fontSize: '16px', 
                    fontWeight: 'bold', 
                    padding: '10px 20px', 
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)', 
                    color: 'white', 
                    letterSpacing: '2px'
                }}>
                Filters
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={filterMenuToggle}
                keepMounted
                open={Boolean(filterMenuToggle)}
                onClose={handleClose}
            >
                <MenuItem>
                    <TextField 
                        label="Title" 
                        name="title" 
                        value={titleFilter} 
                        onChange={(e) => setTitleFilter(e.target.value)} 
                    />
                </MenuItem>
                <MenuItem>
                    <FormControlLabel 
                        control={<Switch checked={isFavoriteFilter} onChange={(e) => setIsFavoriteFilter(e.target.checked)} name="isFavorite" />} 
                        label="Favorite" 
                    />
                </MenuItem>
                <MenuItem>
                    <FormControl fullWidth>
                        <InputLabel>Type</InputLabel>
                        <Select
                            name="type"
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="breakfast">Breakfast</MenuItem>
                            <MenuItem value="lunch">Lunch</MenuItem>
                            <MenuItem value="dinner">Dinner</MenuItem>
                            <MenuItem value="snack">Snack</MenuItem>
                        </Select>
                    </FormControl>
                </MenuItem>
                <MenuItem>
                    <Button onClick={handleSubmit}>Apply Filters</Button>
                </MenuItem>
                <MenuItem>
                    <Button onClick={handleReset}>Clear All Filters</Button>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default MealFilter;
