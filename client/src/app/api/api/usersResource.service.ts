/**
 * Api Documentation
 * Api Documentation
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { Address } from '../model/address';
import { Expert } from '../model/expert';
import { User } from '../model/user';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class UsersResourceService {

    protected basePath = 'https://localhost:8080';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * addExpertToUser
     * 
     * @param expertid expertid
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public addExpertToUserUsingPUT(expertid: string, observe?: 'body', reportProgress?: boolean): Observable<User>;
    public addExpertToUserUsingPUT(expertid: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<User>>;
    public addExpertToUserUsingPUT(expertid: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<User>>;
    public addExpertToUserUsingPUT(expertid: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (expertid === null || expertid === undefined) {
            throw new Error('Required parameter expertid was null or undefined when calling addExpertToUserUsingPUT.');
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.put<User>(`${this.basePath}/user/${encodeURIComponent(String(expertid))}`,
            null,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * addFollowerToUser
     * 
     * @param followerid followerid
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public addFollowerToUserUsingPUT(followerid: string, observe?: 'body', reportProgress?: boolean): Observable<User>;
    public addFollowerToUserUsingPUT(followerid: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<User>>;
    public addFollowerToUserUsingPUT(followerid: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<User>>;
    public addFollowerToUserUsingPUT(followerid: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (followerid === null || followerid === undefined) {
            throw new Error('Required parameter followerid was null or undefined when calling addFollowerToUserUsingPUT.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (followerid !== undefined && followerid !== null) {
            queryParameters = queryParameters.set('followerid', <any>followerid);
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.put<User>(`${this.basePath}/user/follow`,
            null,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * deleteExpertFromUser
     * 
     * @param expertid expertid
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteExpertFromUserUsingDELETE(expertid: string, observe?: 'body', reportProgress?: boolean): Observable<User>;
    public deleteExpertFromUserUsingDELETE(expertid: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<User>>;
    public deleteExpertFromUserUsingDELETE(expertid: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<User>>;
    public deleteExpertFromUserUsingDELETE(expertid: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (expertid === null || expertid === undefined) {
            throw new Error('Required parameter expertid was null or undefined when calling deleteExpertFromUserUsingDELETE.');
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.delete<User>(`${this.basePath}/user/${encodeURIComponent(String(expertid))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * deleteFollowerFromUser
     * 
     * @param followerid followerid
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteFollowerFromUserUsingDELETE(followerid: string, observe?: 'body', reportProgress?: boolean): Observable<User>;
    public deleteFollowerFromUserUsingDELETE(followerid: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<User>>;
    public deleteFollowerFromUserUsingDELETE(followerid: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<User>>;
    public deleteFollowerFromUserUsingDELETE(followerid: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (followerid === null || followerid === undefined) {
            throw new Error('Required parameter followerid was null or undefined when calling deleteFollowerFromUserUsingDELETE.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (followerid !== undefined && followerid !== null) {
            queryParameters = queryParameters.set('followerid', <any>followerid);
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.delete<User>(`${this.basePath}/user/follow`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * findAllExpertOfUser
     * 
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public findAllExpertOfUserUsingGET(id: string, observe?: 'body', reportProgress?: boolean): Observable<Array<Expert>>;
    public findAllExpertOfUserUsingGET(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Expert>>>;
    public findAllExpertOfUserUsingGET(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Expert>>>;
    public findAllExpertOfUserUsingGET(id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling findAllExpertOfUserUsingGET.');
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<Array<Expert>>(`${this.basePath}/user/experts/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * findExpertsByUsers
     * 
     * @param searchparams searchparams
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public findExpertsByUsersUsingGET(searchparams: string, observe?: 'body', reportProgress?: boolean): Observable<Array<Expert>>;
    public findExpertsByUsersUsingGET(searchparams: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Expert>>>;
    public findExpertsByUsersUsingGET(searchparams: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Expert>>>;
    public findExpertsByUsersUsingGET(searchparams: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (searchparams === null || searchparams === undefined) {
            throw new Error('Required parameter searchparams was null or undefined when calling findExpertsByUsersUsingGET.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (searchparams !== undefined && searchparams !== null) {
            queryParameters = queryParameters.set('searchparams', <any>searchparams);
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<Array<Expert>>(`${this.basePath}/user/expert`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * findFollowersByUsers
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public findFollowersByUsersUsingGET(observe?: 'body', reportProgress?: boolean): Observable<Array<User>>;
    public findFollowersByUsersUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<User>>>;
    public findFollowersByUsersUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<User>>>;
    public findFollowersByUsersUsingGET(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<Array<User>>(`${this.basePath}/user/followers`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * findUsersExpertsUnion
     * 
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public findUsersExpertsUnionUsingGET(id: string, observe?: 'body', reportProgress?: boolean): Observable<Array<Expert>>;
    public findUsersExpertsUnionUsingGET(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Expert>>>;
    public findUsersExpertsUnionUsingGET(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Expert>>>;
    public findUsersExpertsUnionUsingGET(id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling findUsersExpertsUnionUsingGET.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (id !== undefined && id !== null) {
            queryParameters = queryParameters.set('id', <any>id);
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<Array<Expert>>(`${this.basePath}/user/expertsintersect`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getAll
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAllUsingGET1(observe?: 'body', reportProgress?: boolean): Observable<Array<User>>;
    public getAllUsingGET1(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<User>>>;
    public getAllUsingGET1(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<User>>>;
    public getAllUsingGET1(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<Array<User>>(`${this.basePath}/users`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getById
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getByIdUsingGET(observe?: 'body', reportProgress?: boolean): Observable<User>;
    public getByIdUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<User>>;
    public getByIdUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<User>>;
    public getByIdUsingGET(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<User>(`${this.basePath}/user`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * saveAddress
     * 
     * @param address address
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public saveAddressUsingPOST(address: Address, observe?: 'body', reportProgress?: boolean): Observable<User>;
    public saveAddressUsingPOST(address: Address, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<User>>;
    public saveAddressUsingPOST(address: Address, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<User>>;
    public saveAddressUsingPOST(address: Address, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (address === null || address === undefined) {
            throw new Error('Required parameter address was null or undefined when calling saveAddressUsingPOST.');
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<User>(`${this.basePath}/user/address`,
            address,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * saveLanguage
     * 
     * @param language language
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public saveLanguageUsingPOST(language: string, observe?: 'body', reportProgress?: boolean): Observable<User>;
    public saveLanguageUsingPOST(language: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<User>>;
    public saveLanguageUsingPOST(language: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<User>>;
    public saveLanguageUsingPOST(language: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (language === null || language === undefined) {
            throw new Error('Required parameter language was null or undefined when calling saveLanguageUsingPOST.');
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<User>(`${this.basePath}/user/language`,
            language,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * SearchUserWithQuery
     * 
     * @param searchparams searchparams
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public searchUserWithQueryUsingGET(searchparams: string, observe?: 'body', reportProgress?: boolean): Observable<Array<User>>;
    public searchUserWithQueryUsingGET(searchparams: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<User>>>;
    public searchUserWithQueryUsingGET(searchparams: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<User>>>;
    public searchUserWithQueryUsingGET(searchparams: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (searchparams === null || searchparams === undefined) {
            throw new Error('Required parameter searchparams was null or undefined when calling searchUserWithQueryUsingGET.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (searchparams !== undefined && searchparams !== null) {
            queryParameters = queryParameters.set('searchparams', <any>searchparams);
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<Array<User>>(`${this.basePath}/user/search`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
