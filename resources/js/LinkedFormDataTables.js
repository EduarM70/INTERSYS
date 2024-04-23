
/*

	** Estandar de linkeo de formularios con tablas
	
*/
var LinkedFormDataTables = function( config ) 
{

	this.DataTableInstance = config.DataTable; 

	this.FormLinkSelector = config.FormDOM;

	this.RowSelector = $(this.FormLinkSelector).hasClass('arrows') == true ? $(this.FormLinkSelector) : $(this.FormLinkSelector).find('.arrows');

	var self = this;

	/*	
		Handlear eventos personalizados
	*/
	this.DataTableInstance.on('preDraw', function(e, settings) {
        var
			table = self.getDataTableInstance(),
			primera_fila = $(table.rows({ page: 'current' }).nodes()[0]),

			dtDom = self.getDataTableDOM(table)
		;

		if($(dtDom).data('lastRow') != undefined && $(dtDom).data('lastRow').length > 0) {
//			console.log($(table.rows({ page: 'current' }).nodes()) );

			$(dtDom).removeData('lastRow');
		}
		$(dtDom).data('lastRow', primera_fila);
    });

	this.DataTableInstance.on('draw', function () {
		var
			table = self.getDataTableInstance(),
			tabla_id = table.context[0].nTable
		;
		if($(tabla_id).data('to-page') == undefined) {
			return false;
		}
		if($(tabla_id).data('to-page') == 'next') 
		{
			var 
				primera_fila = $(table.rows({ page: 'current' }).nodes()[0])
			;
			if(typeof config.onSelectRow == "function") {
				config.onSelectRow( primera_fila );
			}
			self.selectRow( primera_fila );
		}
		else if($(tabla_id).data('to-page') == 'previous') 
		{
			var 
				items = $(table.rows({ page: 'current' }).nodes()).length,
				ultima_fila = $(table.rows({ page: 'current' }).nodes()[ items - 1 ])
			;
			if(typeof config.onSelectRow == "function") {
				config.onSelectRow( ultima_fila );
			}
			self.selectRow( ultima_fila );
		}
		$(tabla_id).removeData('to-page');
	});

	if($(this.RowSelector).length > 0) {

	   	$(this.RowSelector).find('.arrow-right').click(function(e) {
			e.preventDefault();

			var 
				table = self.getDataTableInstance();

			var
				items = $(table.rows({ page: 'current' }).nodes()).length,
				activo = table.row(self.getSpecificTableID() + '.row-active').node(),
				tabla_id = table.context[0].nTable
			;

			if(items < 1) {
				return false;
			}
			if(activo == null) {
				var
					primera_fila = $(table.rows({ page: 'current' }).nodes()[0])
				;
				if(typeof config.onSelectRow == "function") {
					config.onSelectRow( primera_fila );
				}
				self.selectRow(primera_fila);
				return false;
			}
			if($(activo).index() >= items - 1) {
				if($('.dataTables_processing').css('display') != 'none') {
					return false;
				}
				var 
					button_change_page = $('.dataTables_paginate .next:not(.disabled)')
				;
				if(button_change_page.length > 0) {
					$(tabla_id).data('to-page', 'next');
					button_change_page.click();
				}
				return false;
			}
			if(typeof config.onSelectRow == "function") {
				config.onSelectRow( $(activo).next() );
			}
			self.selectRow( $(activo).next() );
		});
		$(this.RowSelector).find('.arrow-left').click(function(e) {
			var
				table = self.getDataTableInstance()
			;
			e.preventDefault();
			var
				items = $(table.rows({ page: 'current' }).nodes()).length,
				activo = table.row(self.getSpecificTableID() + '.row-active').node(),
				tabla_id = table.context[0].nTable
			;
			if(items < 1) {
				return false;
			}
			if(activo == null) {
				var 
					ultima_fila = $(table.rows({ page: 'current' }).nodes()[ items - 1 ])
				;
				if(typeof config.onSelectRow == "function") {
					config.onSelectRow(ultima_fila);
				}
				self.selectRow(ultima_fila);
				return false;
			}
			if($(activo).index() <= 0) {	
				if($('.dataTables_processing').css('display') != 'none') {
					return false;
				}
				var 
					button_change_page = $('.dataTables_paginate .previous:not(.disabled)')
				;
				if(button_change_page.length > 0) {
					$(tabla_id).data('to-page', 'previous');
					button_change_page.click();
				}
				return false;
			}
			if(typeof config.onSelectRow == "function") {
				config.onSelectRow( $(activo).prev() );
			}
			self.selectRow( $(activo).prev() );
		});
    }

    this.getSpecificTableID = function() {

    	/*
		var 
			table_id_specific = $('[aria-hidden="false"] table').attr('id')
		;

		console.log(table_id_specific);

		return '#' + table_id_specific;
		*/
		return '';
    }

	this.getColumnByNameTD = function(nameTD) {
		var 
			table = self.getDataTableInstance(),
			f = undefined
		;
		$.each(table.settings().init().columns, function(k, v) {
			if(v.title == undefined)
				return;

			var 
				tableSel = LinkedFormDataTablesDyn.getTableSelector( table ),
				tdName = LinkedFormDataTablesDyn.estandarNameTD( tableSel , v.title)
			;
			if(nameTD == tdName) {
				f = v;
				return false;
			}
		});
		return f;
	}

	this.getRowData = function(rowDOM) {
		var 
			instanceTarget = self.getDataTableInstance()
		;
	 	return instanceTarget.row( rowDOM ).data();
	}

	this.selectRow = function(rowDOM) {
		var 
			instanceTarget = self.getDataTableInstance(),
			dtDom = self.getDataTableDOM(instanceTarget),
			DataTableID = $(dtDom).attr('id')
		;

		$(instanceTarget.rows(self.getSpecificTableID() + '.row-active').nodes()).removeClass('row-active');
		$(instanceTarget.row(rowDOM).node()).addClass('row-active');
		$(dtDom).data('activo', rowDOM);
		return 1;
	}

	this.RowUnselect = function() {

		var instanceTarget = self.getDataTableInstance();
		$(instanceTarget.rows(self.getSpecificTableID() + '.row-active').nodes()).removeClass('row-active');

		if(typeof config.onUnselectRow == "function") {
			config.onUnselectRow(instanceTarget.rows(self.getSpecificTableID() + '.row-active').nodes());
		}
		return 1;
	}

	this.getColumnByDataName = function(name) {
		var 
			table = self.getDataTableInstance(),
			f = undefined
		;
		$.each(table.settings().init().columns, function(k, v) {
			if(v.data == null)
				return;

			if(name == v.data) {
				f = v;
				return false;
			}
		});
		return f;
	}

	this.getDataTableDOM = function(instanceDT) {
		return instanceDT.context[0].nTable;
	}
	
	this.getDataTableInstance = function() {
		return self.DataTableInstance;
	}

	this.getFormLink = function() {
		return self.FormLinkSelector;
	}
}

class LinkedFormDataTablesDyn 
{
    static createdRow(table, row, data, dataIndex ) {
    	table = table.getDataTableInstance();

    	if(table.settings().init().primaryKey != undefined) {
    		var 
    			d = table.settings().init().primaryKey
    		;
			$(row).attr('row-id', data[d]);
    	}

		var 
			tabla_id = table.context[0].nTable
		;
		if( $(tabla_id).data('activo') !== undefined) {
			var 
				item_seleccionado = $( $(tabla_id).data('activo') ).attr('row-id'),
				item_buscado = $(row).attr('row-id')
			;
			if(item_buscado == item_seleccionado) {
				$(row).addClass('row-active');
			}
		}
	 }

	 static getTableSelector(table) {
	 	return table.context[0].nTable;
	 }
	 static fnCreatedCell(table, nTd, sData, oData, iRow, iCol) {
	 	table = table.getDataTableInstance();
    	
		var
			index = table.cell(nTd).index().column,
			name = table.settings().init().columns[ index ].title,
			tabla_id = table.context[0].nTable
		;

		/*
			* Propiedad estandar de nombre de columna
		*/
		if(name != null) {
			$(nTd).attr('name-column', this.estandarNameTD(tabla_id, name) );
		}

		/*
			* Propiedad adicional de estado
		*/
		if( table.settings().init().columns[ index ].propEstado !== undefined ) {
			var 
				n = table.settings().init().columns[ index ]
			;
			if(typeof n.propFunction == "function") {

				$(nTd).attr('id-estado', oData[ n.data ]);
				$(nTd).addClass('text-center');
				$(nTd).text( oData[ n.data ] == 1 ? n.propTxtActivo : n.propTxtInactivo )
			}
			else {
				$(nTd).attr('id-estado', oData[ n.data ]);
				$(nTd).addClass('text-center');
				$(nTd).text( oData[ n.data ] == 1 ? n.propTxtActivo : n.propTxtInactivo )
			}
        }

       	/*
			* Propiedad adicional de edicion en linea
		*/
		if( table.settings().init().columns[ index ].inlineEdit === true ) {
			var 
				n = table.settings().init().columns[ index ]
			;
			$(nTd).text('');
			$(nTd).prepend($('<input></input>').addClass('transparent-input').attr('row-inline-editable', 'true').attr('old-value', oData[n.data]).val(oData[n.data]))	
        }

		if( table.settings().init().columns[ index ].wordWrap === true ) {
			$(nTd).css({'word-break': 'break-all'});
        }

       	/*
			* Propiedad adicional de edicion en linea
		*/
		/*
		if( table.settings().init().columns[ index ].width !== undefined ) {
			var 
				n = table.settings().init().columns[ index ]
			;

			$(nTd).css({'width': table.settings().init().columns[ index ].width});	
        }
        */
	}

	static estandarNameTD( tabla, name ) {
		// Replazar espacios por -
		// Remplazar puntos por espacios vacios
		return $(tabla).attr('id') + '-' + name.toLowerCase().replace(/\ /g, '-').replace(/\./g, '');
	}


	static estandarNameTDFromData( tabla, name ) {
		// Replazar espacios por -
		// Remplazar puntos por espacios vacios
		return $(tabla).attr('id') + '-' + name.toLowerCase().replace(/\_/g, '-');
	}
}