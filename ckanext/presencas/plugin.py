import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit
import ast
from dateutil.parser import parse
import json

def converte_string_lista_exibicao(dataset, nome):

    # O ckanext-scheming possui um bug para exibir multiple_text se apenas um foi inserido
    # O código abaixo transforma string para uma lista com um item antes de exibir

    if dataset.get(nome) and type(dataset.get(nome)) != list:

        dataset[nome] = json.loads(json.dumps([dataset.get(nome)]))

def converte_string_lista_indexacao(dataset, nome):

    if dataset.get(nome):

        try:
            json.loads(dataset.get(nome))

        except Exception:
            dataset[nome] = json.dumps([dataset.get(nome)])

def adiciona_indexacao_listas(dataset, nome_lista):

    if dataset.get(nome_lista):

        lista = ast.literal_eval(dataset[nome_lista])

        dataset[nome_lista] = []

        for item in lista:

            dataset[nome_lista].append(item)

def retorna_minimo_maximo_data_inicio():

    func_procura_pacotes = toolkit.get_action('package_search')

    usuario = toolkit.get_action('get_site_user')({'ignore_auth': True}, {})
    contexto = {'user': usuario['name']}

    datasets = func_procura_pacotes(contexto, dict(q = 'data_inicio:[* TO *]'))['results']
    anos = []

    for resultado in datasets:

        try:
            anos.append(parse(resultado.get('data_inicio')).year)

        except Exception:
            pass

    anos.sort()

    if len(anos) == 0:
        return None

    if len(anos) == 1:
        return (anos[0], anos[0])

    return (anos[0], anos[-1])

class PresencasPlugin(plugins.SingletonPlugin):
    plugins.implements(plugins.IConfigurer)
    plugins.implements(plugins.IFacets)
    plugins.implements(plugins.IPackageController)
    plugins.implements(plugins.ITemplateHelpers)

    # IConfigurer

    def update_config(self, config_):
        toolkit.add_template_directory(config_, "templates")
        toolkit.add_public_directory(config_, "public")
        toolkit.add_resource("assets", "presencas")

    # IFacets

    def dataset_facets(self, facets_dict, package_type):
        
        facets_dict['cidade'] = toolkit._('Cidades')
        facets_dict['estado'] = toolkit._('Estados')
        facets_dict['cidade_atuacao'] = toolkit._('Cidades de atuação')
        facets_dict['estado_atuacao'] = toolkit._('Estados de atuação')
        facets_dict['pais_atuacao'] = toolkit._('Países de atuação')
        facets_dict['linguagens'] = toolkit._('Linguagens')
        facets_dict['data_inicio'] = toolkit._('Data de início')
        return facets_dict

    def organization_facets(self, facets_dict, organization_type, package_type):

        return facets_dict

    def group_facets(self, facets_dict, group_type, package_type):

        return facets_dict
    
    # IPackageController
    
    def before_dataset_index(self, pkg_dict):

        converte_string_lista_indexacao(pkg_dict, 'cidade_atuacao')
        converte_string_lista_indexacao(pkg_dict, 'estado_atuacao')
        converte_string_lista_indexacao(pkg_dict, 'pais_atuacao')
        converte_string_lista_indexacao(pkg_dict, 'linguagens')

        adiciona_indexacao_listas(pkg_dict, 'cidade_atuacao')
        adiciona_indexacao_listas(pkg_dict, 'estado_atuacao')
        adiciona_indexacao_listas(pkg_dict, 'pais_atuacao')
        adiciona_indexacao_listas(pkg_dict, 'linguagens')
        return pkg_dict
    
    def before_dataset_search(self, search_params):
        return search_params

    def read(self, entity):
        return entity

    def create(self, entity):
        return entity

    def edit(self, entity):
        return entity

    def delete(self, entity):
        return entity

    def after_dataset_create(self, context, pkg_dict):
        return pkg_dict

    def after_dataset_update(self, context , pkg_dict):
        return pkg_dict

    def after_dataset_delete(self, context , pkg_dict):
        return pkg_dict

    def after_dataset_show(self, context, pkg_dict):
        return pkg_dict

    def after_dataset_search(self, search_results, search_params):
        return search_results

    def before_dataset_view(self, pkg_dict):

        converte_string_lista_exibicao(pkg_dict, 'cidade_atuacao')
        converte_string_lista_exibicao(pkg_dict, 'estado_atuacao')
        converte_string_lista_exibicao(pkg_dict, 'pais_atuacao')
        converte_string_lista_exibicao(pkg_dict, 'linguagens')
        converte_string_lista_exibicao(pkg_dict, 'links')

        return pkg_dict
    
    # ITemplateHelpers

    def get_helpers(self):

        ret = dict()

        ret['presencas_retorna_minimo_maximo_data_inicio'] = retorna_minimo_maximo_data_inicio

        return ret
