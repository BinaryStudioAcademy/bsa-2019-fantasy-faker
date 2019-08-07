import orm from '../db/connection';
import associate from '../db/associations';

const Test = orm.import('./test');

associate({
    Test
});

export {
    Test as TestModel
};
