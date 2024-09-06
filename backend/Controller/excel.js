const excel = require('exceljs');

router.get('/transactions/export', async (req, res) => {
    try {
        const [transactions] = await promisePool.query(
            'SELECT category, amount, type, created_at FROM transactions WHERE user_id = ?',
            [req.body.user_id]
        );

        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Transactions');

        worksheet.columns = [
            { header: 'Category', key: 'category', width: 20 },
            { header: 'Amount', key: 'amount', width: 15 },
            { header: 'Type', key: 'type', width: 10 },
            { header: 'Date', key: 'created_at', width: 25 },
        ];

        worksheet.addRows(transactions);

        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader('Content-Disposition', 'attachment; filename=transactions.xlsx');

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('Error exporting transactions:', error);
        res.status(500).send({ error: 'Error exporting transactions.' });
    }
});
