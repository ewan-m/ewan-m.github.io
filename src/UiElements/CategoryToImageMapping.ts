
import biology from '../Assets/categories/biology.jpg';
import computerscience from '../Assets/categories/computerscience.jpg';
import economics from '../Assets/categories/economics.jpg';
import electricalengineering from '../Assets/categories/electricalengineering.jpg';
import finance from '../Assets/categories/finance.jpg';
import mathematics from '../Assets/categories/mathematics.jpg';
import physics from '../Assets/categories/physics.jpg';
import statistics from '../Assets/categories/statistics.jpg';

export const categoryToImageMapping: { [key: string]: string } = {
    'physics': physics,
    'ph': physics,
    'bio': biology,
    'cs': computerscience,
    'econ': economics,
    'eess': electricalengineering,
    'fin': finance,
    'math': mathematics,
    'stat': statistics,
    'gr-qc': physics
};